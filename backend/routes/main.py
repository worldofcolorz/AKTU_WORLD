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


# --- Simple file-backed global visit counter ---
_counter_lock = threading.Lock()
# Prefer an env var path; default to a temp directory that is writable in most hosts
_counter_file = os.environ.get(
    "VISIT_COUNTER_FILE",
    os.path.join(tempfile.gettempdir(), "visit_count.txt"),
)


def _ensure_counter_file() -> None:
    folder = os.path.dirname(os.path.abspath(_counter_file))
    if not os.path.exists(folder):
        os.makedirs(folder, exist_ok=True)
    if not os.path.exists(_counter_file):
        with open(_counter_file, "w", encoding="utf-8") as f:
            f.write("0")


def _read_counter() -> int:
    _ensure_counter_file()
    try:
        with open(_counter_file, "r", encoding="utf-8") as f:
            return int((f.read() or "0").strip())
    except Exception:
        return 0


def _write_counter(value: int) -> None:
    _ensure_counter_file()
    with open(_counter_file, "w", encoding="utf-8") as f:
        f.write(str(value))


@api_blueprint.get("/visits")
def get_visits():
    with _counter_lock:
        count = _read_counter()
    return jsonify({"count": count})


@api_blueprint.post("/visits/increment")
def increment_visits():
    with _counter_lock:
        count = _read_counter()
        count += 1
        _write_counter(count)
    return jsonify({"count": count})


