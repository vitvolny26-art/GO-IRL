# GO IRL Telegram Mini App

GO IRL (Go In Real Life) is a Telegram Mini App for creating and joining offline activities, starting with Olomouc.

## Current Stack

- React, TypeScript, Vite
- Zustand for client state
- Supabase for activities, participants, private join requests, and realtime updates
- Telegram WebApp bootstrap with guest fallback for local browser testing
- Dark mobile-first UI with safe-area aware header

## Setup

```powershell
pnpm install
pnpm run dev
```

Create `.env.local` from `.env.example` and fill:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

After starting Vite, open the local URL shown in the terminal. For Telegram testing, the deployed Mini App URL is configured in BotFather.

## Verification

```powershell
pnpm run test
pnpm run lint
pnpm run build
```

The build command runs `tsc -b` and then creates the production Vite bundle.

## Implemented

- Universal `Activity` model
- Public and private activities
- Organizer edit flow
- Private join requests with approve/reject actions
- Participants list with joined, waiting, and pending states
- Activity creation with category, activity type, address, and optional location URL
- Share link that opens the Telegram Mini App with `startapp`
- City selection architecture with Olomouc as the first city
- Russian and Czech localization architecture
- Safe-area aware fixed header for Telegram Mini App
- Supabase schema and RLS policies in `supabase/schema.sql`
- ESLint and Vitest quality gates
- Netlify build configuration in `netlify.toml`

## Project Documents

- `CHANGELOG.md` - shipped changes
- `ROADMAP.md` - product and engineering direction
- `SPRINTS.md` - sprint-by-sprint delivery plan
- `SPRINT0_STATUS.md` - current Sprint 0 production verification status
- `BACKLOG.md` - confirmed work queue
- `RELEASE_NOTES.md` - release-ready notes for deployment
- `DEPLOYMENT.md` - production deployment and smoke-test checklist
