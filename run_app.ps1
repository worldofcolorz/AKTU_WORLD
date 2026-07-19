# EduLorz App Launcher
Write-Host "Starting EduLorz App..." -ForegroundColor Green
Write-Host ""

# Check if virtual environment exists and activate it
if (Test-Path ".venv") {
    Write-Host "Activating virtual environment..." -ForegroundColor Yellow
    & ".venv\Scripts\Activate.ps1"
}

# Check if backend requirements are installed - checks the same .venv created
# above, not backend\venv (which nothing in this project ever creates, so this
# check never actually skipped the install before)
if (-not (Test-Path ".venv") -and -not (Get-Command "flask" -ErrorAction SilentlyContinue)) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location "backend"
    pip install -r requirements.txt
    Set-Location ".."
}

Write-Host "Starting Flask app with integrated frontend..." -ForegroundColor Cyan
Write-Host ""

# Start the app
Set-Location "backend"
python app.py
