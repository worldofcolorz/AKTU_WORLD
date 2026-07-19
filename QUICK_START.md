# 🚀 Quick Start Guide

## Before you start

Notes/Papers/Resources/Syllabus, the AI chat, and the contact form all depend
on external services that need one-time setup - without them the app will run
but look broken (empty content, chat errors, contact form disabled). See:

- [DRIVE_SETUP.md](DRIVE_SETUP.md)
- [AI_SETUP.md](AI_SETUP.md)
- [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)

Copy `backend/.env.example` → `backend/.env` and `frontend/.env.example` →
`frontend/.env` and fill in the values from those guides.

## Running Your App

Now you can run your entire application (both backend and frontend) with just **one command**!

### Option 1: Simple Python Command
```bash
cd backend
python app.py
```

### Option 2: Windows Batch File
Double-click `run_app.bat` in your project folder.

### Option 3: PowerShell Script
Right-click `run_app.ps1` and select "Run with PowerShell"

## What Happens Automatically

1. ✅ **Frontend Dependencies**: Automatically installs npm packages if needed
2. ✅ **Frontend Build**: Automatically builds the React app to `frontend/dist`
3. ✅ **Backend Server**: Starts Flask server on port 5000
4. ✅ **Frontend Serving**: Serves the built React app from the same port

## Access Your App

- **Frontend**: http://127.0.0.1:5000
- **Backend API**: http://127.0.0.1:5000/api

## Requirements

- Python 3.7+
- Node.js and npm
- Flask and Flask-CORS (auto-installed)

## Next Time

Just run `python app.py` from the backend folder, and everything will work automatically! 🎉
