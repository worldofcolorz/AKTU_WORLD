from __future__ import annotations

import os
import subprocess
import sys
import shutil
from flask import Flask, jsonify, send_from_directory, request, redirect
from flask_cors import CORS


def _resolve_npm_command() -> str:
    """Return the npm executable name/path or raise a helpful error."""
    npm_cmd = shutil.which("npm") or shutil.which("npm.cmd")
    if not npm_cmd:
        print("Node.js/npm not found. Please install from https://nodejs.org/ and ensure 'npm' is in PATH.")
        sys.exit(1)
    return npm_cmd


def _get_latest_mtime(path: str) -> float:
    latest = 0.0
    for root, _, files in os.walk(path):
        for fname in files:
            try:
                latest = max(latest, os.path.getmtime(os.path.join(root, fname)))
            except OSError:
                continue
    return latest


def build_frontend():
    """Build the frontend React app if it doesn't exist or needs updating."""
    frontend_dir = os.path.join(os.path.dirname(__file__), "..", "frontend")
    dist_dir = os.path.join(frontend_dir, "dist")
    src_dir = os.path.join(frontend_dir, "src")

    needs_build = True
    if os.path.exists(dist_dir) and os.listdir(dist_dir):
        dist_index = os.path.join(dist_dir, "index.html")
        try:
            dist_mtime = os.path.getmtime(dist_index)
        except OSError:
            dist_mtime = 0.0
        src_mtime = _get_latest_mtime(src_dir)
        needs_build = src_mtime >= dist_mtime

    if not needs_build:
        return

    print("Building frontend...")

    previous_cwd = os.getcwd()
    try:
        os.chdir(frontend_dir)

        npm_cmd = _resolve_npm_command()

        # Install dependencies if needed
        if not os.path.exists("node_modules"):
            print("Installing frontend dependencies...")
            install_cmd = [npm_cmd, "ci"] if os.path.exists("package-lock.json") else [npm_cmd, "install"]
            subprocess.run(install_cmd, check=True)

        subprocess.run([npm_cmd, "run", "build"], check=True)
        print("Frontend built successfully!")
    except FileNotFoundError as err:
        print(f"Build failed: {err}")
        print("Ensure Node.js and npm are installed and available in PATH.")
        sys.exit(1)
    except subprocess.CalledProcessError as err:
        print(f"Error building frontend: {err}")
        print("Please make sure you have Node.js and npm installed, and that 'npm run build' works in the frontend directory.")
        sys.exit(1)
    finally:
        os.chdir(previous_cwd)


def create_app() -> Flask:
    """Create and configure the Flask application.

    - Automatically builds the React app if needed
    - Serves the built React app from ../frontend/dist
    - Exposes API routes under /api
    """

    # Build frontend before creating Flask app (skipped when using dev server or on Render)
    use_dev_server = os.environ.get("USE_VITE_DEV_SERVER") == "1"
    dev_origin = os.environ.get("VITE_DEV_ORIGIN", "http://127.0.0.1:5173")
    skip_build = os.environ.get("SKIP_FRONTEND_BUILD") == "1" or os.environ.get("RENDER") == "true"
    if not use_dev_server and not skip_build:
        build_frontend()

    static_folder_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

    app = Flask(
        __name__,
        static_folder=static_folder_path,
        static_url_path="/",
        template_folder=os.path.join(os.path.dirname(__file__), "templates"),
    )
    CORS(app)

    # Register API blueprint
    from routes import api_blueprint  # noqa: WPS433 (local import to avoid circular import)

    app.register_blueprint(api_blueprint, url_prefix="/api")

    @app.route("/")
    def serve_frontend_root():  # type: ignore[unused-ignore]
        if use_dev_server:
            return redirect(dev_origin, code=302)
        index_path = os.path.join(app.static_folder or "", "index.html")
        if os.path.exists(index_path):
            return send_from_directory(app.static_folder, "index.html")  # type: ignore[arg-type]
        return jsonify({"message": "Frontend not built yet. Run 'npm run build' in frontend/."}), 200

    # SPA history fallback: serve index.html for non-API routes so deep links like /papers work
    @app.route("/<path:requested_path>")
    def spa_history_fallback(requested_path: str):  # type: ignore[unused-ignore]
        # Do not intercept API routes
        if requested_path.startswith("api/"):
            return jsonify({"error": "Not found"}), 404

        if use_dev_server:
            # Redirect to Vite dev server preserving the path
            return redirect(f"{dev_origin}/{requested_path}", code=302)

        static_root = app.static_folder or ""
        candidate = os.path.join(static_root, requested_path)

        # If the requested asset exists in dist, serve it directly
        if os.path.exists(candidate) and os.path.isfile(candidate):
            return send_from_directory(app.static_folder, requested_path)  # type: ignore[arg-type]

        # Otherwise, return index.html to let the SPA router handle it
        index_path = os.path.join(static_root, "index.html")
        if os.path.exists(index_path):
            return send_from_directory(static_root, "index.html")  # type: ignore[arg-type]
        return jsonify({"message": "Frontend not built yet. Run 'npm run build' in frontend/."}), 200

    # Global 404 -> SPA fallback for non-API routes in production build
    @app.errorhandler(404)
    def handle_404(_):  # type: ignore[unused-ignore]
        if request.path.startswith("/api"):
            return jsonify({"error": "Not found"}), 404
        if use_dev_server:
            return redirect(dev_origin, code=302)
        static_root = app.static_folder or ""
        index_path = os.path.join(static_root, "index.html")
        if os.path.exists(index_path):
            return send_from_directory(static_root, "index.html")  # type: ignore[arg-type]
        return jsonify({"error": "Not found"}), 404

    return app


if __name__ == "__main__":
    app = create_app()
    print("🚀 Starting Flask app with integrated frontend...")
    print("🌐 Backend API available at: http://127.0.0.1:5000/api")
    print("🎨 Frontend available at: http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)

# Expose app for WSGI servers (e.g., gunicorn on Render)
app = create_app()


