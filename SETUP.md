# 🚀 GO IRL Development Setup - Automatic Installation

## Quick Start (3 Steps)

### Step 1: Run Setup (as Administrator)

```powershell
# Open PowerShell as Administrator and run:
cd C:\Users\lenovo\Documents\Codex\2026-05-28\new-chat
.\setup-dev-tools.ps1
```

Or simply:
1. Find `setup-dev-tools.bat` in the project folder
2. Right-click → "Run as administrator"

### Step 2: Install Chrome Extensions

The script will provide 3 links. Open each in your browser and click "Add to Chrome":

1. **Shotdiff** — for visual before/after comparison
2. **React DevTools** — for debugging React components
3. **Live.js** — for auto-reload on changes

### Step 3: Start Dev Server

Find `start-dev.bat` in the project folder and double-click it.

Or in PowerShell:
```powershell
cd C:\Users\lenovo\Documents\Codex\2026-05-28\new-chat
pnpm run dev
```

---

## What Gets Installed

### VS Code Extensions
- ✅ **Live Server** — auto-update on file changes
- ✅ **Thunder Client** — API testing
- ✅ **TypeScript** — type support
- ✅ **Prettier** — code formatting
- ✅ **ESLint** — error checking
- ✅ **Tailwind CSS** — style hints
- ✅ **Docker** — container management

### Node Packages
- ✅ All dependencies from `package.json`

### Startup Scripts
- ✅ `start-dev.bat` — quick dev server launch
- ✅ `.env.local` — environment config

---

## How It Works

```
1. You open VS Code
   ↓
2. Edit code (e.g., add new component)
   ↓
3. Press Ctrl+S (save)
   ↓
4. Vite automatically rebuilds
   ↓
5. Browser auto-refreshes (hot reload)
   ↓
6. Shotdiff shows all visual changes
   ↓
7. React DevTools shows component changes
```

---

## Commands

### Start dev server
```bash
pnpm run dev
```

### Run tests
```bash
pnpm run test
```

### Check linting
```bash
pnpm run lint
```

### Build for production
```bash
pnpm run build
```

---

## Troubleshooting

### VS Code not installed
```powershell
winget install Microsoft.VisualStudioCode
```

### pnpm not installed
```powershell
npm install -g pnpm
```

### Need administrator rights
1. Open PowerShell
2. Right-click → "Run as administrator"
3. Run the script again

### Port 5178 already in use
```powershell
# Find process on that port
netstat -ano | findstr :5178

# Or use a different port
pnpm run dev -- --port 5179
```

---

## Help

If anything doesn't work — let me know!

🚀 **Ready to develop!**
