@echo off
REM GO IRL Development Server Starter
REM Starts pnpm dev server and opens browser

title GO IRL Development Server

cd /d "%~dp0"

echo.
echo ================================
echo   Starting GO IRL Dev Server
echo ================================
echo.
echo Opening: http://localhost:5178
echo.
echo Tips:
echo - Keep this window open while developing
echo - Changes auto-reload in browser
echo - Press Ctrl+C to stop
echo.

REM Open browser
timeout /t 2 /nobreak
start http://localhost:5178

REM Start dev server
pnpm run dev

pause
