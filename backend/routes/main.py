from __future__ import annotations

from flask import jsonify

from . import api_blueprint


@api_blueprint.get("/health")
def health_check():
    return jsonify({"status": "ok"})


