@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo Node.js com npm nao foi encontrado.
  echo Instale o Node.js LTS em https://nodejs.org e execute este arquivo novamente.
  pause
  exit /b 1
)

if not exist "node_modules" call npm install
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:5173"
call npm run dev -- --host 127.0.0.1
