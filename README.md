# AKTU World – Monorepo (Flask + React)

- Backend: Flask (serves API under /api and can serve built frontend from frontend/dist)
- Frontend: React (Vite)

## Develop

Terminal 1 (backend):

`powershell
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
pip install -r backend\\requirements.txt
python backend\\app.py
``n
Terminal 2 (frontend):

`powershell
cd frontend
npm install
npm run dev
``n
The frontend dev server proxies /api/* to Flask on port 5000.

## Build & Serve

`powershell
cd frontend
npm run build
cd ..
python backend\\app.py
``n
Flask will serve the built files from frontend/dist at /.
