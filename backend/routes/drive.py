from __future__ import annotations

import json
import os
import threading
import time
from typing import Any, Optional

from flask import Response, jsonify, request
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from . import api_blueprint

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

FILE_FIELDS = "id,name,mimeType,webViewLink,modifiedTime,md5Checksum,size"
FOLDER_MIME_TYPE = "application/vnd.google-apps.folder"

SECTION_FOLDER_NAMES = {
    "notes": "Notes",
    "papers": "Papers",
    "resources": "Resources",
    "syllabus": "Syllabus",
}

TREE_CACHE_TTL_SECONDS = int(os.environ.get("DRIVE_TREE_CACHE_TTL_SECONDS", "900"))
CACHE_MAX_BYTES = int(os.environ.get("DRIVE_CACHE_MAX_MB", "800")) * 1024 * 1024
CACHE_DIR = os.path.join(
    os.environ.get("VISIT_COUNTER_FILE") and os.path.dirname(os.environ["VISIT_COUNTER_FILE"]) or os.getcwd(),
    "drive_cache",
)

_service_lock = threading.Lock()
_drive_service = None

_tree_cache_lock = threading.Lock()
_tree_cache: dict[str, tuple[float, Any]] = {}

_root_children_lock = threading.Lock()
_root_children_cache: Optional[tuple[float, list[dict]]] = None


def _get_credentials_error() -> Optional[str]:
    if not os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON"):
        return "GOOGLE_SERVICE_ACCOUNT_JSON is not configured"
    if not os.environ.get("GOOGLE_DRIVE_ROOT_FOLDER_ID"):
        return "GOOGLE_DRIVE_ROOT_FOLDER_ID is not configured"
    return None


def _get_drive_service():
    """Lazily build a cached Drive API client from the service-account env var."""
    global _drive_service
    with _service_lock:
        if _drive_service is not None:
            return _drive_service
        raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
        if not raw:
            raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON is not configured")
        info = json.loads(raw)
        credentials = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
        _drive_service = build("drive", "v3", credentials=credentials, cache_discovery=False)
        return _drive_service


def _list_children(folder_id: str) -> list[dict]:
    service = _get_drive_service()
    children: list[dict] = []
    page_token = None
    while True:
        response = (
            service.files()
            .list(
                q=f"'{folder_id}' in parents and trashed = false",
                fields=f"nextPageToken, files({FILE_FIELDS})",
                pageToken=page_token,
                pageSize=1000,
                orderBy="folder,name",
            )
            .execute()
        )
        children.extend(response.get("files", []))
        page_token = response.get("nextPageToken")
        if not page_token:
            break
    return children


def _build_node(item: dict) -> dict:
    is_folder = item.get("mimeType") == FOLDER_MIME_TYPE
    node = {
        "id": item["id"],
        "name": item.get("name", "Untitled"),
        "type": "folder" if is_folder else "file",
        "mimeType": item.get("mimeType"),
    }
    if is_folder:
        node["children"] = [_build_node(child) for child in _list_children(item["id"])]
    else:
        node["webViewLink"] = item.get("webViewLink")
        node["downloadUrl"] = f"/api/drive/file/{item['id']}"
        node["size"] = item.get("size")
    return node


def _get_root_children() -> list[dict]:
    global _root_children_cache
    root_folder_id = os.environ["GOOGLE_DRIVE_ROOT_FOLDER_ID"]
    now = time.time()
    with _root_children_lock:
        if _root_children_cache is not None:
            cached_at, cached_value = _root_children_cache
            if now - cached_at < TREE_CACHE_TTL_SECONDS:
                return cached_value
        children = _list_children(root_folder_id)
        _root_children_cache = (now, children)
        return children


def _resolve_section_folder_id(section: str) -> Optional[str]:
    target_name = SECTION_FOLDER_NAMES.get(section)
    if not target_name:
        return None
    for child in _get_root_children():
        if child.get("mimeType") == FOLDER_MIME_TYPE and child.get("name", "").strip().lower() == target_name.lower():
            return child["id"]
    return None


def _get_section_tree(section: str) -> Optional[dict]:
    now = time.time()
    with _tree_cache_lock:
        cached = _tree_cache.get(section)
        if cached is not None and now - cached[0] < TREE_CACHE_TTL_SECONDS:
            return cached[1]

    folder_id = _resolve_section_folder_id(section)
    if folder_id is None:
        return None

    tree = {
        "id": folder_id,
        "name": SECTION_FOLDER_NAMES[section],
        "type": "folder",
        "children": [_build_node(child) for child in _list_children(folder_id)],
    }

    with _tree_cache_lock:
        _tree_cache[section] = (now, tree)
    return tree


def _count_tree(node: dict) -> tuple[int, int]:
    """Returns (file_count, folder_count) for a tree, counting recursively."""
    if node.get("type") != "folder":
        return (1, 0)
    files = 0
    folders = 1
    for child in node.get("children", []):
        f, d = _count_tree(child)
        files += f
        folders += d
    return (files, folders)


@api_blueprint.get("/drive/status")
def drive_status():
    error = _get_credentials_error()
    return jsonify({
        "configured": error is None,
        "reason": error,
    })


@api_blueprint.get("/drive/tree")
def drive_tree():
    section = (request.args.get("section") or "").strip().lower()
    if section not in SECTION_FOLDER_NAMES:
        return jsonify({"error": f"Unknown section '{section}'. Expected one of {list(SECTION_FOLDER_NAMES)}"}), 400

    error = _get_credentials_error()
    if error:
        return jsonify({"error": "Drive is not configured", "details": error}), 503

    try:
        tree = _get_section_tree(section)
    except HttpError as exc:
        return jsonify({"error": "Google Drive API error", "details": str(exc)}), 502
    except Exception as exc:  # noqa: BLE001 - surface a safe message, never crash the request
        return jsonify({"error": "Failed to read Drive folder structure", "details": str(exc)}), 502

    if tree is None:
        return jsonify({"error": f"No '{SECTION_FOLDER_NAMES[section]}' folder found under the configured root"}), 404

    return jsonify(tree)


@api_blueprint.get("/drive/stats")
def drive_stats():
    error = _get_credentials_error()
    if error:
        return jsonify({"totalResources": 0, "totalSubjects": 0, "configured": False})

    total_files = 0
    total_folders = 0
    try:
        for section in SECTION_FOLDER_NAMES:
            tree = _get_section_tree(section)
            if tree is None:
                continue
            files, folders = _count_tree(tree)
            total_files += files
            total_folders += folders
    except Exception:  # noqa: BLE001 - stats are best-effort, never break the home page
        return jsonify({"totalResources": 0, "totalSubjects": 0, "configured": True, "error": "stats_unavailable"})

    return jsonify({
        "totalResources": total_files,
        "totalSubjects": max(total_folders - len(SECTION_FOLDER_NAMES), 0),
        "configured": True,
    })


def _ensure_cache_dir() -> None:
    os.makedirs(CACHE_DIR, exist_ok=True)


def _cache_path_for(file_id: str) -> str:
    return os.path.join(CACHE_DIR, file_id)


def _meta_path_for(file_id: str) -> str:
    return os.path.join(CACHE_DIR, f"{file_id}.meta.json")


def _evict_if_needed() -> None:
    """Simple LRU eviction by last-access time when the cache dir exceeds the size cap."""
    try:
        entries = []
        total_size = 0
        for fname in os.listdir(CACHE_DIR):
            if fname.endswith(".meta.json"):
                continue
            fpath = os.path.join(CACHE_DIR, fname)
            try:
                stat = os.stat(fpath)
            except OSError:
                continue
            total_size += stat.st_size
            entries.append((stat.st_atime, stat.st_size, fpath))

        if total_size <= CACHE_MAX_BYTES:
            return

        entries.sort(key=lambda e: e[0])  # oldest access first
        for _, size, fpath in entries:
            if total_size <= CACHE_MAX_BYTES:
                break
            file_id = os.path.basename(fpath)
            for candidate in (fpath, _meta_path_for(file_id)):
                try:
                    os.remove(candidate)
                except OSError:
                    pass
            total_size -= size
    except OSError:
        pass


@api_blueprint.get("/drive/file/<file_id>")
def drive_file(file_id: str):
    error = _get_credentials_error()
    if error:
        return jsonify({"error": "Drive is not configured", "details": error}), 503

    try:
        service = _get_drive_service()
        remote_meta = service.files().get(fileId=file_id, fields=FILE_FIELDS).execute()
    except HttpError as exc:
        return jsonify({"error": "Google Drive API error", "details": str(exc)}), 502
    except Exception as exc:  # noqa: BLE001
        return jsonify({"error": "Failed to fetch file metadata", "details": str(exc)}), 502

    _ensure_cache_dir()
    cache_path = _cache_path_for(file_id)
    meta_path = _meta_path_for(file_id)
    remote_checksum = remote_meta.get("md5Checksum")

    cached_checksum = None
    if os.path.exists(meta_path):
        try:
            with open(meta_path, "r", encoding="utf-8") as f:
                cached_checksum = json.load(f).get("md5Checksum")
        except (OSError, json.JSONDecodeError):
            cached_checksum = None

    is_cached = os.path.exists(cache_path) and (remote_checksum is None or cached_checksum == remote_checksum)

    if not is_cached:
        try:
            request_obj = service.files().get_media(fileId=file_id)
            with open(cache_path, "wb") as f:
                f.write(request_obj.execute())
            with open(meta_path, "w", encoding="utf-8") as f:
                json.dump({"md5Checksum": remote_checksum}, f)
        except HttpError as exc:
            return jsonify({"error": "Google Drive API error", "details": str(exc)}), 502
        except Exception as exc:  # noqa: BLE001
            return jsonify({"error": "Failed to download file from Drive", "details": str(exc)}), 502
        _evict_if_needed()
    else:
        try:
            os.utime(cache_path, None)  # bump last-access time for LRU
        except OSError:
            pass

    with open(cache_path, "rb") as f:
        data = f.read()

    response = Response(data, mimetype=remote_meta.get("mimeType", "application/octet-stream"))
    response.headers["Content-Disposition"] = f'inline; filename="{remote_meta.get("name", file_id)}"'
    response.headers["Cache-Control"] = "public, max-age=86400"
    if remote_checksum:
        response.headers["ETag"] = remote_checksum
    return response
