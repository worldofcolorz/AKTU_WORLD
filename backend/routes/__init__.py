from __future__ import annotations

from flask import Blueprint

api_blueprint = Blueprint("api", __name__)

# Import routes to attach to the blueprint
from . import main  # noqa: F401, WPS347
from . import ai  # noqa: F401, WPS347


