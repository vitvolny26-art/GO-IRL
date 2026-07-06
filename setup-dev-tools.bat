@echo off
REM GO IRL Development Environment Setup
REM Run this as Administrator

setlocal enabledelayedexpansion

echo.
echo ================================
echo   GO IRL Setup Script
echo ================================
echo.

REM Run PowerShell script
echo Running setup...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-dev-tools.ps1"

pause
