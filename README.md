# EduLorz — Monorepo (Flask + React)

- Backend: Flask (serves API under /api and can serve built frontend from frontend/dist)
- Frontend: React (Vite)

Content (Notes/Papers/Resources/Syllabus) is read live from a Google Drive folder,
and the AI chat and contact form depend on a couple of other services — see
**Setup** below before expecting a fully working app.

## Setup

Before running locally or deploying, set these up (one-time):

- [DRIVE_SETUP.md](DRIVE_SETUP.md) — Google Drive integration (required for Notes/Papers/Resources/Syllabus)
- [AI_SETUP.md](AI_SETUP.md) — AI chat (Google AI Studio / Gemini)
- [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) — contact form → Google Sheets

Copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to
`frontend/.env`, then fill in the values from the guides above.

## Develop

Terminal 1 (backend):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
python backend\app.py
```

Terminal 2 (frontend):

```powershell
cd frontend
npm install
npm run dev
```

The frontend dev server proxies /api/* to Flask on port 5000.

## Build & Serve

```powershell
cd frontend
npm run build
cd ..
python backend\app.py
```

Flask will serve the built files from frontend/dist at /.
