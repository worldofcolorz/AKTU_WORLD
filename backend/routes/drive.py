from __future__ import annotations

import json
import os
import re
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Optional

from flask import Response, jsonify, request
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from . import api_blueprint

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

FILE_FIELDS = "id,name,mimeType,webViewLink,modifiedTime,md5Checksum,size,shortcutDetails"
FOLDER_MIME_TYPE = "application/vnd.google-apps.folder"
SHORTCUT_MIME_TYPE = "application/vnd.google-apps.shortcut"

SECTION_FOLDER_NAMES = {
    "notes": "Notes",
    "papers": "Papers",
    "resources": "Resources",
    "syllabus": "Syllabus",
}

MAX_TREE_NODES = int(os.environ.get("DRIVE_MAX_TREE_NODES", "5000"))
LIST_CONCURRENCY = int(os.environ.get("DRIVE_LIST_CONCURRENCY", "16"))

TREE_CACHE_TTL_SECONDS = int(os.environ.get("DRIVE_TREE_CACHE_TTL_SECONDS", "900"))
CACHE_MAX_BYTES = int(os.environ.get("DRIVE_CACHE_MAX_MB", "800")) * 1024 * 1024
# Own env var rather than piggybacking on VISIT_COUNTER_FILE (an unrelated
# feature's setting) - falls back to the same persistent-disk mount point by
# default so existing Render deploys keep working without extra config.
CACHE_DIR = os.environ.get("DRIVE_CACHE_DIR") or os.path.join(
    os.environ.get("VISIT_COUNTER_FILE") and os.path.dirname(os.environ["VISIT_COUNTER_FILE"]) or os.getcwd(),
    "drive_cache",
)

_thread_local = threading.local()

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
    """Builds (and caches) one Drive API client PER THREAD. The underlying
    httplib2 connection is not thread-safe - sharing a single service instance
    across the ThreadPoolExecutor's worker threads causes intermittent
    '[SSL: BAD_RECORD_TYPE]' errors and hangs under concurrency, so each worker
    thread gets its own client instead."""
    if getattr(_thread_local, "drive_service", None) is not None:
        return _thread_local.drive_service
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not raw:
        raise RuntimeError("GOOGLE_SERVICE_ACCOUNT_JSON is not configured")
    info = json.loads(raw)
    credentials = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
    service = build("drive", "v3", credentials=credentials, cache_discovery=False)
    _thread_local.drive_service = service
    return service


def _list_children_page(service, folder_id: str, page_token: Optional[str]):
    """One paginated files.list call, retried with backoff - concurrent requests
    against the same service account occasionally get transient errors/resets
    from Drive under load, and a single flaky call shouldn't fail the whole
    tree build."""
    last_error = None
    for attempt in range(4):
        try:
            return (
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
        except Exception as exc:  # noqa: BLE001 - HttpError and transient SSL/socket errors both land here
            last_error = exc
            time.sleep(0.5 * (2 ** attempt))
    raise last_error


def _list_children(folder_id: str) -> list[dict]:
    service = _get_drive_service()
    children: list[dict] = []
    page_token = None
    while True:
        response = _list_children_page(service, folder_id, page_token)
        children.extend(response.get("files", []))
        page_token = response.get("nextPageToken")
        if not page_token:
            break
    return children


def _item_to_node_shell(item: dict) -> Optional[dict]:
    """Turns a raw Drive API file/folder/shortcut entry into a node with no
    children filled in yet (folders get children=[] to be populated by the
    caller's BFS loop). Shortcuts resolve to their real target transparently,
    so content can stay wherever it already lives in Drive while being
    "linked into" the site's expected folder structure without moving/copying
    anything - only the shortcut's own name is kept (so it can be renamed
    freely without touching the original)."""
    mime_type = item.get("mimeType")

    if mime_type == SHORTCUT_MIME_TYPE:
        details = item.get("shortcutDetails") or {}
        target_id = details.get("targetId")
        target_mime = details.get("targetMimeType")
        if not target_id:
            return None  # broken/dangling shortcut - skip it
        if target_mime == FOLDER_MIME_TYPE:
            return {"id": target_id, "name": item.get("name", "Untitled"), "type": "folder", "mimeType": target_mime, "children": []}
        return {
            "id": target_id,
            "name": item.get("name", "Untitled"),
            "type": "file",
            "mimeType": target_mime,
            "webViewLink": None,
            "downloadUrl": f"/api/drive/file/{target_id}",
            "size": None,
        }

    is_folder = mime_type == FOLDER_MIME_TYPE
    if is_folder:
        return {"id": item["id"], "name": item.get("name", "Untitled"), "type": "folder", "mimeType": mime_type, "children": []}
    return {
        "id": item["id"],
        "name": item.get("name", "Untitled"),
        "type": "file",
        "mimeType": mime_type,
        "webViewLink": item.get("webViewLink"),
        "downloadUrl": f"/api/drive/file/{item['id']}",
        "size": item.get("size"),
    }


def _build_tree(root_id: str, root_name: str) -> dict:
    """Builds the full folder tree breadth-first, fetching each level's folders'
    children concurrently (Drive API calls are I/O-bound, so a thread pool gives
    a real wall-clock win here) instead of one folder at a time depth-first -
    a wide-but-shallow tree (many subjects, few nesting levels) that used to take
    tens of seconds now completes in roughly one round-trip per depth level."""
    root_node = {"id": root_id, "name": root_name, "type": "folder", "mimeType": FOLDER_MIME_TYPE, "children": []}
    frontier = [root_node]
    visited_nodes = 1
    truncated = False

    with ThreadPoolExecutor(max_workers=LIST_CONCURRENCY) as executor:
        while frontier and visited_nodes < MAX_TREE_NODES:
            listings = executor.map(lambda node: _list_children(node["id"]), frontier)
            next_frontier = []
            for parent_node, items in zip(frontier, listings):
                for item in items:
                    if visited_nodes >= MAX_TREE_NODES:
                        truncated = True
                        break
                    child_node = _item_to_node_shell(item)
                    if child_node is None:
                        continue
                    parent_node["children"].append(child_node)
                    visited_nodes += 1
                    if child_node["type"] == "folder":
                        next_frontier.append(child_node)
            frontier = next_frontier

    if truncated:
        print(f"Drive tree for '{root_name}' hit DRIVE_MAX_TREE_NODES={MAX_TREE_NODES} - some content was not included")
        root_node["truncated"] = True

    return root_node


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
        if child.get("name", "").strip().lower() != target_name.lower():
            continue
        mime_type = child.get("mimeType")
        if mime_type == FOLDER_MIME_TYPE:
            return child["id"]
        if mime_type == SHORTCUT_MIME_TYPE:
            details = child.get("shortcutDetails") or {}
            if details.get("targetMimeType") == FOLDER_MIME_TYPE and details.get("targetId"):
                return details["targetId"]
    return None


def _get_cached_section_tree(section: str) -> Optional[dict]:
    """Read-only cache lookup - NEVER builds the tree itself. This dataset is
    large enough (hundreds of files across dozens of Drive folders) that a
    live build takes 30-60+ seconds, which is unacceptable inside a single
    user-facing HTTP request (and exceeds typical app-server request timeouts
    outright). Only the background warmup loop is allowed to actually build a
    tree; requests only ever read whatever is already cached."""
    with _tree_cache_lock:
        cached = _tree_cache.get(section)
        return cached[1] if cached is not None else None


def _build_and_cache_section_tree(section: str) -> Optional[dict]:
    folder_id = _resolve_section_folder_id(section)
    if folder_id is None:
        with _tree_cache_lock:
            _tree_cache[section] = (time.time(), None)
        return None
    tree = _build_tree(folder_id, SECTION_FOLDER_NAMES[section])
    with _tree_cache_lock:
        _tree_cache[section] = (time.time(), tree)
    return tree


_warmup_started = False
_warmup_lock = threading.Lock()
_building_sections_lock = threading.Lock()
_building_sections: set[str] = set()


def _kick_off_background_build(section: str) -> None:
    """Fire-and-forget build for a single section, e.g. triggered by a user
    request that found a cold/empty cache before the warmup loop got to it.
    Never runs two builds for the same section concurrently."""
    with _building_sections_lock:
        if section in _building_sections:
            return
        _building_sections.add(section)

    def _run():
        try:
            _build_and_cache_section_tree(section)
        except Exception as exc:  # noqa: BLE001 - best-effort background build
            print(f"Drive background build failed for '{section}': {exc}")
        finally:
            with _building_sections_lock:
                _building_sections.discard(section)

    threading.Thread(target=_run, daemon=True).start()


def _warm_all_sections() -> None:
    for section in SECTION_FOLDER_NAMES:
        now = time.time()
        with _tree_cache_lock:
            cached = _tree_cache.get(section)
            is_fresh = cached is not None and now - cached[0] < TREE_CACHE_TTL_SECONDS
        if is_fresh:
            continue
        try:
            _build_and_cache_section_tree(section)
        except Exception as exc:  # noqa: BLE001 - warmup is best-effort, never crash the background thread
            print(f"Drive cache warmup failed for '{section}': {exc}")


def _warmup_loop() -> None:
    while True:
        if _get_credentials_error() is None:
            _warm_all_sections()
        # Refresh a bit before the cache would naturally expire, so real visitors
        # (almost) never hit a cold cache and pay the full tree-build latency.
        time.sleep(max(60, TREE_CACHE_TTL_SECONDS - 60))


def ensure_warmup_started() -> None:
    """Kicks off the background cache-warming thread once per process. Safe to
    call multiple times (e.g. once per request) - only the first call starts it."""
    global _warmup_started
    with _warmup_lock:
        if _warmup_started:
            return
        _warmup_started = True
        threading.Thread(target=_warmup_loop, daemon=True).start()


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

    ensure_warmup_started()
    tree = _get_cached_section_tree(section)
    if tree is None:
        # Nothing cached yet (first boot, before the background warmup loop has
        # completed a pass) - kick off a background build and ask the client to
        # retry shortly, rather than blocking this request for 30-60+ seconds.
        _kick_off_background_build(section)
        return jsonify({"error": "Still loading this section for the first time, please retry in a few seconds", "retry": True}), 202

    return jsonify(tree)


@api_blueprint.get("/drive/stats")
def drive_stats():
    error = _get_credentials_error()
    if error:
        return jsonify({"totalResources": 0, "totalSubjects": 0, "configured": False})

    ensure_warmup_started()
    total_files = 0
    total_folders = 0
    for section in SECTION_FOLDER_NAMES:
        tree = _get_cached_section_tree(section)
        if tree is None:
            continue
        files, folders = _count_tree(tree)
        total_files += files
        total_folders += folders

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

    # Strip characters that would break out of the quoted filename param (or
    # inject header fields via a stray newline) - Drive filenames are
    # user-authored and can contain quotes/special characters.
    safe_name = re.sub(r'[\r\n"]', "_", remote_meta.get("name", file_id))

    response = Response(data, mimetype=remote_meta.get("mimeType", "application/octet-stream"))
    response.headers["Content-Disposition"] = f'inline; filename="{safe_name}"'
    response.headers["Cache-Control"] = "public, max-age=86400"
    if remote_checksum:
        response.headers["ETag"] = remote_checksum
    return response


# Warm the tree cache in the background from process start (and periodically
# thereafter) so real visitors almost never pay the full cold-tree-build
# latency - the loop itself waits for credentials to be configured.
ensure_warmup_started()
