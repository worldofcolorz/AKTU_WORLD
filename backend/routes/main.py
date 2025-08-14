from __future__ import annotations

from flask import jsonify, request
import os
import threading
import tempfile
from typing import Tuple

from . import api_blueprint


@api_blueprint.get("/health")
def health_check():
    return jsonify({"status": "ok"})


# --- Persistent visit counter with backup ---
_counter_lock = threading.Lock()

# Primary storage location (persistent disk)
_primary_counter_file = os.environ.get(
    "VISIT_COUNTER_FILE",
    os.path.join(tempfile.gettempdir(), "visit_count.txt"),
)

# Backup locations for redundancy
_backup_locations = [
    _primary_counter_file,
    os.path.join(tempfile.gettempdir(), "visit_count_backup.txt"),
    os.path.join(os.getcwd(), "visit_count_local.txt")
]

# Initial count to preserve your current 72 visits
_INITIAL_COUNT = 72


def _ensure_counter_file(filepath: str) -> None:
    folder = os.path.dirname(os.path.abspath(filepath))
    if not os.path.exists(folder):
        os.makedirs(folder, exist_ok=True)
    if not os.path.exists(filepath):
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(str(_INITIAL_COUNT))


def _read_counter_from_file(filepath: str) -> int:
    try:
        _ensure_counter_file(filepath)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read().strip()
            return int(content) if content else _INITIAL_COUNT
    except Exception:
        return _INITIAL_COUNT


def _write_counter_to_file(filepath: str, value: int) -> bool:
    try:
        _ensure_counter_file(filepath)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(str(value))
        return True
    except Exception:
        return False


def _read_counter() -> int:
    """Read counter from all locations and return the highest value"""
    max_count = _INITIAL_COUNT  # Start with initial count as minimum
    for filepath in _backup_locations:
        count = _read_counter_from_file(filepath)
        max_count = max(max_count, count)
    return max_count


def _write_counter(value: int) -> None:
    """Write counter to all available locations"""
    for filepath in _backup_locations:
        _write_counter_to_file(filepath, value)


def _sync_all_counters() -> None:
    """Ensure all counter files have the same value"""
    current_count = _read_counter()
    for filepath in _backup_locations:
        _write_counter_to_file(filepath, current_count)


@api_blueprint.get("/visits")
def get_visits():
    with _counter_lock:
        count = _read_counter()
        # Sync all counters to ensure consistency
        _sync_all_counters()
    return jsonify({"count": count})


@api_blueprint.post("/visits/increment")
def increment_visits():
    with _counter_lock:
        count = _read_counter()
        count += 1
        _write_counter(count)
        # Sync all counters after increment
        _sync_all_counters()
    return jsonify({"count": count})


@api_blueprint.post("/visits/recover")
def recover_visits():
    """Recover counter from all backup locations and sync them"""
    with _counter_lock:
        count = _read_counter()
        _sync_all_counters()
    return jsonify({
        "count": count,
        "message": "Counter recovered and synced from all backup locations"
    })


@api_blueprint.post("/visits/set")
def set_visits():
    """Manually set the visit counter to a specific value"""
    try:
        data = request.get_json()
        if not data or 'count' not in data:
            return jsonify({"error": "Missing count parameter"}), 400
        
        new_count = int(data['count'])
        if new_count < 0:
            return jsonify({"error": "Count must be non-negative"}), 400
        
        with _counter_lock:
            _write_counter(new_count)
            _sync_all_counters()
        
        return jsonify({
            "count": new_count,
            "message": f"Counter set to {new_count}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Initialize counter on module load
def _initialize_counter():
    """Initialize counter on startup, recovering from any available backups"""
    try:
        with _counter_lock:
            count = _read_counter()
            _sync_all_counters()
            print(f"Visit counter initialized with value: {count}")
    except Exception as e:
        print(f"Error initializing counter: {e}")


# Run initialization when module is imported
_initialize_counter()


