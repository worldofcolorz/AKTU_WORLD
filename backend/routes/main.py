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


# --- Simple and reliable visit counter ---
_counter_lock = threading.Lock()

# Primary storage location (persistent disk on Render)
_counter_file = os.environ.get(
    "VISIT_COUNTER_FILE",
    os.path.join(tempfile.gettempdir(), "visit_count.txt"),
)

# Fallback to current count if file is corrupted
_current_count = None  # Will be initialized from file


def _ensure_counter_file() -> None:
    """Create counter file and directory if they don't exist"""
    try:
        folder = os.path.dirname(os.path.abspath(_counter_file))
        if not os.path.exists(folder):
            os.makedirs(folder, exist_ok=True)
        if not os.path.exists(_counter_file):
            with open(_counter_file, "w", encoding="utf-8") as f:
                f.write("0")
    except Exception as e:
        print(f"Warning: Could not ensure counter file: {e}")


def _read_counter() -> int:
    """Read counter from file, return current count if file fails"""
    global _current_count
    
    try:
        _ensure_counter_file()
        with open(_counter_file, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if content and content.isdigit():
                count = int(content)
                _current_count = count  # Update current count
                return count
            else:
                # If file is empty or invalid, initialize with 0
                if _current_count is None:
                    _current_count = 0
                    _write_counter(0)  # Ensure file has valid content
                print(f"Invalid counter content: '{content}', using current count: {_current_count}")
                return _current_count
    except Exception as e:
        # If file doesn't exist or can't be read, initialize with 0
        if _current_count is None:
            _current_count = 0
            try:
                _write_counter(0)  # Try to create the file
            except:
                pass  # If we can't write, at least we have in-memory count
        print(f"Error reading counter file: {e}, using current count: {_current_count}")
        return _current_count


def _write_counter(value: int) -> None:
    """Write counter to file and update current count"""
    global _current_count
    
    if value < 0:
        return
    
    _current_count = value
    
    try:
        _ensure_counter_file()
        with open(_counter_file, "w", encoding="utf-8") as f:
            f.write(str(value))
        print(f"Counter written successfully: {value}")
    except Exception as e:
        print(f"Error writing counter file: {e}, but current count updated to: {value}")


@api_blueprint.get("/visits")
def get_visits():
    """Get current visit count"""
    with _counter_lock:
        count = _read_counter()
    return jsonify({"count": count})


@api_blueprint.post("/visits/increment")
def increment_visits():
    """Increment visit count"""
    with _counter_lock:
        count = _read_counter()
        count += 1
        _write_counter(count)
    return jsonify({"count": count})


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
        
        return jsonify({
            "count": new_count,
            "message": f"Counter set to {new_count}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api_blueprint.get("/visits/status")
def get_visits_status():
    """Get counter status for debugging"""
    return jsonify({
        "current_count": _current_count,
        "file_path": _counter_file,
        "file_exists": os.path.exists(_counter_file),
        "file_content": _read_counter()
    })


# Initialize counter on module load
def _initialize_counter():
    """Initialize counter on startup - ensures proper restoration from persistent storage"""
    global _current_count
    
    try:
        print("🔄 Initializing visit counter...")
        print(f"📁 Counter file: {_counter_file}")
        
        # Force read from file to get the actual persisted value
        _current_count = None  # Reset to force file read
        count = _read_counter()
        
        print(f"✅ Visit counter initialized with value: {count}")
        
        # Double-check by reading file directly to ensure we got the right value
        if os.path.exists(_counter_file):
            try:
                with open(_counter_file, "r", encoding="utf-8") as f:
                    file_content = f.read().strip()
                    if file_content and file_content.isdigit():
                        file_count = int(file_content)
                        if file_count != count:
                            print(f"⚠️ Mismatch detected! File: {file_count}, Memory: {count}")
                            _current_count = file_count
                            count = file_count
                            print(f"🔄 Corrected to file value: {file_count}")
                        else:
                            print(f"✅ File and memory values match: {count}")
            except Exception as e:
                print(f"Warning during verification: {e}")
                
    except Exception as e:
        print(f"❌ Error initializing counter: {e}")
        # Ensure we have some value even if initialization fails
        if _current_count is None:
            _current_count = 0


@api_blueprint.post("/visits/reset")
def reset_visits():
    """Reset the counter to a specific value (useful for recovery)"""
    try:
        data = request.get_json()
        if not data or 'count' not in data:
            return jsonify({"error": "Missing count parameter"}), 400
        
        new_count = int(data['count'])
        if new_count < 0:
            return jsonify({"error": "Count must be non-negative"}), 400
        
        with _counter_lock:
            _write_counter(new_count)
        
        return jsonify({
            "count": new_count,
            "message": f"Counter reset to {new_count}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api_blueprint.post("/visits/restore")
def restore_visits():
    """Restore the counter from file or set to a minimum value"""
    try:
        with _counter_lock:
            # Try to read the actual value from file first
            current_file_value = 0
            if os.path.exists(_counter_file):
                try:
                    with open(_counter_file, "r", encoding="utf-8") as f:
                        content = f.read().strip()
                        if content and content.isdigit():
                            current_file_value = int(content)
                except:
                    pass
            
            # Use the higher of file value or a reasonable minimum
            restore_value = max(current_file_value, 100)  # Ensure at least 100 visits
            _write_counter(restore_value)
        
        return jsonify({
            "count": restore_value,
            "message": f"Counter restored to {restore_value}",
            "file_value": current_file_value
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Run initialization when module is imported
_initialize_counter()


