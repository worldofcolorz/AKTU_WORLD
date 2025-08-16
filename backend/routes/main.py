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


# --- Robust persistent visit counter with intelligent recovery ---
_counter_lock = threading.Lock()

# Primary storage location (persistent disk on Render)
_primary_counter_file = os.environ.get(
    "VISIT_COUNTER_FILE",
    os.path.join(tempfile.gettempdir(), "visit_count.txt"),
)

# Backup locations for redundancy (order by persistence priority)
_backup_locations = [
    _primary_counter_file,  # Most persistent (Render disk)
    os.path.join(os.getcwd(), "visit_count_local.txt"),  # Project directory
    os.path.join(tempfile.gettempdir(), "visit_count_backup.txt")  # Temp backup
]

# Track the last known good count to prevent data loss
_last_known_count = None


def _ensure_counter_file(filepath: str) -> None:
    """Create counter file and directory if they don't exist"""
    try:
        folder = os.path.dirname(os.path.abspath(filepath))
        if not os.path.exists(folder):
            os.makedirs(folder, exist_ok=True)
        if not os.path.exists(filepath):
            with open(filepath, "w", encoding="utf-8") as f:
                f.write("0")  # Start from 0, not hardcoded value
    except Exception as e:
        print(f"Warning: Could not ensure counter file {filepath}: {e}")


def _read_counter_from_file(filepath: str) -> int:
    """Read counter from a specific file, return 0 if file is invalid"""
    try:
        _ensure_counter_file(filepath)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if content and content.isdigit():
                return int(content)
            return 0
    except Exception as e:
        print(f"Warning: Could not read from {filepath}: {e}")
        return 0


def _write_counter_to_file(filepath: str, value: int) -> bool:
    """Write counter to a specific file"""
    try:
        _ensure_counter_file(filepath)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(str(value))
        return True
    except Exception as e:
        print(f"Warning: Could not write to {filepath}: {e}")
        return False


def _read_counter() -> int:
    """Read counter from all locations and return the highest valid value"""
    global _last_known_count
    
    max_count = 0
    valid_counts = []
    
    # Read from all backup locations
    for filepath in _backup_locations:
        count = _read_counter_from_file(filepath)
        if count > 0:  # Only consider valid counts
            valid_counts.append(count)
            max_count = max(max_count, count)
    
    # If we have a last known count, use it as a fallback
    if max_count == 0 and _last_known_count is not None:
        print(f"Recovering from last known count: {_last_known_count}")
        max_count = _last_known_count
    
    # Update last known count
    if max_count > 0:
        _last_known_count = max_count
    
    print(f"Counter recovery: found {len(valid_counts)} valid counts: {valid_counts}, using: {max_count}")
    return max_count


def _write_counter(value: int) -> None:
    """Write counter to all available locations and update last known count"""
    global _last_known_count
    
    if value <= 0:
        return
    
    _last_known_count = value
    
    # Write to all locations
    success_count = 0
    for filepath in _backup_locations:
        if _write_counter_to_file(filepath, value):
            success_count += 1
    
    print(f"Counter written to {success_count}/{len(_backup_locations)} locations: {value}")


def _sync_all_counters() -> None:
    """Ensure all counter files have the same value"""
    current_count = _read_counter()
    if current_count > 0:
        for filepath in _backup_locations:
            _write_counter_to_file(filepath, current_count)


def _recover_and_sync() -> int:
    """Recover counter from all sources and sync all locations"""
    with _counter_lock:
        count = _read_counter()
        if count > 0:
            _sync_all_counters()
        return count


@api_blueprint.get("/visits")
def get_visits():
    """Get current visit count with automatic recovery"""
    with _counter_lock:
        count = _recover_and_sync()
    return jsonify({"count": count})


@api_blueprint.post("/visits/increment")
def increment_visits():
    """Increment visit count and ensure persistence"""
    with _counter_lock:
        count = _recover_and_sync()  # Recover first
        count += 1
        _write_counter(count)
        _sync_all_counters()
    return jsonify({"count": count})


@api_blueprint.post("/visits/recover")
def recover_visits():
    """Force recovery of counter from all backup locations"""
    count = _recover_and_sync()
    return jsonify({
        "count": count,
        "message": f"Counter recovered to {count} from backup locations"
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


@api_blueprint.get("/visits/status")
def get_visits_status():
    """Get detailed status of all counter locations"""
    status = {
        "current_count": _recover_and_sync(),
        "last_known_count": _last_known_count,
        "backup_locations": {}
    }
    
    for filepath in _backup_locations:
        try:
            if os.path.exists(filepath):
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read().strip()
                    status["backup_locations"][filepath] = {
                        "exists": True,
                        "value": content if content.isdigit() else "invalid",
                        "size": os.path.getsize(filepath)
                    }
            else:
                status["backup_locations"][filepath] = {
                    "exists": False,
                    "value": "file_not_found",
                    "size": 0
                }
        except Exception as e:
            status["backup_locations"][filepath] = {
                "exists": "error",
                "value": f"error: {str(e)}",
                "size": 0
            }
    
    return jsonify(status)


@api_blueprint.post("/visits/startup")
def startup_visits():
    """Force startup recovery and initialization of the counter"""
    try:
        print("🚀 Forced startup recovery initiated...")
        count = _recover_and_sync()
        print(f"✅ Startup recovery completed: {count}")
        return jsonify({
            "count": count,
            "message": f"Startup recovery completed. Counter set to {count}"
        })
    except Exception as e:
        print(f"❌ Startup recovery failed: {e}")
        return jsonify({"error": str(e)}), 500


# Initialize counter on module load
def _initialize_counter():
    """Initialize counter on startup, recovering from any available backups"""
    try:
        print("🔄 Initializing visit counter...")
        count = _recover_and_sync()
        print(f"✅ Visit counter initialized with value: {count}")
        
        # Log backup status
        print("📁 Backup locations status:")
        for filepath in _backup_locations:
            try:
                if os.path.exists(filepath):
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read().strip()
                        print(f"   {filepath}: {content if content.isdigit() else 'invalid'}")
                else:
                    print(f"   {filepath}: not found")
            except Exception as e:
                print(f"   {filepath}: error reading - {e}")
                
    except Exception as e:
        print(f"❌ Error initializing counter: {e}")
        # Try to recover at least a basic count
        try:
            count = _read_counter()
            print(f"🔄 Basic recovery successful: {count}")
        except Exception as recovery_error:
            print(f"❌ Basic recovery also failed: {recovery_error}")


# Run initialization when module is imported
_initialize_counter()


