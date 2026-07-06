# GO IRL Development Tools Auto-Setup
# Run this in PowerShell as Administrator

Write-Host "🚀 GO IRL Development Tools Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "⚠️  Please run PowerShell as Administrator" -ForegroundColor Red
    exit 1
}

# 1. Install VS Code Extensions
Write-Host "📦 Installing VS Code Extensions..." -ForegroundColor Green

$extensions = @(
    "ritwickdey.LiveServer",
    "rangav.vscode-thunder-client",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-azuretools.vscode-docker"
)

foreach ($ext in $extensions) {
    Write-Host "  Installing $ext..."
    code --install-extension $ext --force
}

Write-Host "✅ VS Code Extensions installed" -ForegroundColor Green
Write-Host ""

# 2. Install Chrome Extensions (provide URLs)
Write-Host "🌐 Chrome Extensions to install manually:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Shotdiff (Visual diff tool):"
Write-Host "   https://chromewebstore.google.com/detail/shotdiff/ibdipjpcppeknjhklhokejmmhghkdhak"
Write-Host ""
Write-Host "2. React DevTools:"
Write-Host "   https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi"
Write-Host ""
Write-Host "3. Live.js (Auto-reload):"
Write-Host "   https://chromewebstore.google.com/detail/livejs/pdnbdhfnpfbkdmhkjlhfjadhdljhkdep"
Write-Host ""

# 3. Install Node packages for GO IRL
Write-Host "📚 Installing Node packages..." -ForegroundColor Green

$projectPath = "C:\Users\lenovo\Documents\Codex\2026-05-28\new-chat"

if (Test-Path $projectPath) {
    Set-Location $projectPath
    
    Write-Host "  Running: pnpm install"
    pnpm install
    
    Write-Host "✅ Node packages installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Project path not found: $projectPath" -ForegroundColor Yellow
}

Write-Host ""

# 4. Create helpful batch file to start dev
Write-Host "📝 Creating startup scripts..." -ForegroundColor Green

$startDevScript = @"
@echo off
REM GO IRL Development Starter
REM This script starts everything you need

cd /d C:\Users\lenovo\Documents\Codex\2026-05-28\new-chat

echo Starting GO IRL Development Environment...
echo.
echo 1. Starting pnpm dev (http://localhost:5178)
echo 2. Press Ctrl+C to stop
echo.

pnpm run dev
"@

$startDevScript | Out-File -FilePath "$projectPath\start-dev.bat" -Encoding ASCII

Write-Host "✅ Startup script created: $projectPath\start-dev.bat" -ForegroundColor Green

# 5. Create .env.local if not exists
Write-Host "⚙️  Checking environment config..." -ForegroundColor Green

$envPath = "$projectPath\.env.local"
if (-not (Test-Path $envPath)) {
    Write-Host "  Creating .env.local with example config..."
    $envContent = @"
# GO IRL Development Environment
VITE_SUPABASE_URL=https://tygfsvjkznypilfyyvdc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[YOUR_KEY_HERE]
VITE_GO_IRL_ADMIN_KEYS=telegram:509799028
VITE_GO_IRL_LEGACY_DEMO_AUTH=true
"@
    $envContent | Out-File -FilePath $envPath -Encoding UTF8
    Write-Host "✅ .env.local created" -ForegroundColor Green
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Next steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Install Chrome Extensions (see links above)"
Write-Host ""
Write-Host "2. Open VS Code:"
Write-Host "   code 'C:\Users\lenovo\Documents\Codex\2026-05-28\new-chat'"
Write-Host ""
Write-Host "3. Start development:"
Write-Host "   - Option A: Run 'start-dev.bat' in project folder"
Write-Host "   - Option B: Run 'pnpm run dev' in terminal"
Write-Host ""
Write-Host "4. Open browser: http://localhost:5178"
Write-Host ""
Write-Host "5. Watch for live changes as code is edited"
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
