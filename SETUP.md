> ⚠️ **HISTORICAL SNAPSHOT / DEPRECATED**
>
> Этот документ является историческим артефактом Sprint 0 / локальной разработки.
>
> Актуальные инструкции см. в `README.md` и `DOCS_INDEX.md`. Не использовать для генерации кода!

# DEPRECATED — Legacy local Windows setup

Status: **deprecated / historical**.

This file is preserved for project history only. Do not use it as the current setup guide.

Reasons:

- It references an old local Windows path: `C:\Users\lenovo\Documents\Codex\2026-05-28\new-chat`.
- It assumes `.bat` / `.ps1` desktop helper scripts.
- Current GO IRL development workflow is Codespaces + pnpm.

Current safe setup:

```bash
pnpm install
pnpm run dev
```

Before commit:

```bash
pnpm run lint
pnpm run build
pnpm run test
```

See also:

- `README.md`
- `DOCS_INDEX.md`
- `docs/DEVELOPMENT_PROTOCOL.md`

---

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
