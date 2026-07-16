# Google Drive Live Integration — Setup Guide

EduLorz now reads its Notes/Papers/Resources/Syllabus content **directly from a Google Drive folder** instead of hardcoded links in the codebase. Add a new PDF to the right Drive folder and it shows up on the site automatically — no code change, no redeploy.

## 1. One-time Drive folder layout

Create (or pick) **one root folder** in Google Drive. Inside it, create exactly 4 subfolders, named:

```
Notes/
Papers/
Resources/
Syllabus/
```

Organize whatever you like underneath each one (e.g. `Papers/BTech/Year 1/Maths/2024.pdf`) — the site mirrors whatever structure you create, at any depth.

## 2. Create a free Google Cloud service account

1. Go to [console.cloud.google.com](https://console.cloud.google.com/) and create a new project (free).
2. In the search bar, open **APIs & Services → Library**, search for **Google Drive API**, click **Enable**.
3. Go to **APIs & Services → Credentials → Create Credentials → Service Account**. Give it any name (e.g. `edulorz-drive-reader`).
4. Open the newly created service account → **Keys** tab → **Add Key → Create new key → JSON**. This downloads a `.json` file — this is your `GOOGLE_SERVICE_ACCOUNT_JSON`.
5. Note the service account's email address (looks like `edulorz-drive-reader@your-project.iam.gserviceaccount.com`).

## 3. Share your Drive folder with the service account

1. In Google Drive, right-click your **root** folder (the one containing Notes/Papers/Resources/Syllabus) → **Share**.
2. Paste the service account's email from step 2.5, give it **Viewer** access, and share (uncheck "notify people" — it's a bot, not a person).
3. Copy the folder's ID from its URL: `https://drive.google.com/drive/folders/`**`THIS_PART_IS_THE_ID`**.

## 4. Set environment variables on Render

On the backend service's **Environment** tab:

- `GOOGLE_SERVICE_ACCOUNT_JSON` — paste the **entire contents** of the JSON key file downloaded in step 2.4, as one value.
- `GOOGLE_DRIVE_ROOT_FOLDER_ID` — the folder ID from step 3.3.

For local development, put the same two variables in a `.env` file (or export them) before running `python backend/app.py`.

## 5. Verify

- `GET /api/drive/status` → should report `{"configured": true}`.
- `GET /api/drive/tree?section=notes` → should return a JSON tree mirroring your `Notes/` folder.
- Visit `/notes`, `/papers`, `/resources`, `/syllabus` on the site and click through.

## How file delivery works (and why it's robust)

Files are **not** linked directly to `drive.google.com` — Google throttles individual file share-links after a burst of views ("too many users have viewed this file"), which is exactly the recurring breakage this change fixes. Instead:

- The backend fetches a file's bytes from the Drive API **once**, caches them on Render's persistent disk, and serves every subsequent view from that local cache — Drive is only touched again if the file changes.
- Drive's own file page is still offered as a secondary "having trouble? open in Drive directly" link, purely as an escape hatch — not as the primary path, since that's the link that throttles.

## Security notes

- Never commit the service account JSON key to git — it only ever lives in Render's env vars / your local `.env`.
- The service account only has **read-only** (Viewer) access — it cannot modify or delete anything in your Drive.
