# Deployment steps (Render + Netlify)

- Backend (Render)
  - Repo root contains `render.yaml` that points to `backend/`
  - Render will run: `pip install -r requirements.txt` then `gunicorn app:app`
  - Frontend build is skipped on Render via `SKIP_FRONTEND_BUILD=1`

- Frontend (Netlify)
  - Deploy `frontend/` directory
  - Build command: `npm run build`
  - Publish directory: `dist`
  - `netlify.toml` proxies `/api/*` to backend and adds SPA fallback

- After both are deployed
  - Edit `frontend/netlify.toml` and replace `YOUR-RENDER-SERVICE` with your actual Render service subdomain
  - Commit and redeploy frontend
