# Release Notes

## v0.1.0 — Sprint 0 Complete

**Date:** 2026-07-01
**Type:** Foundation Release

---

### What's Included

Sprint 0 delivers the minimal working foundation that every developer needs to
understand the project and start contributing.

#### Repository Structure

- Monorepo layout: `backend/`, `apps/`, `packages/`, `docs/`, `scripts/`, `supabase/`, `.ai/`
- pnpm workspaces with turbo pipeline
- Node.js ≥ 20 + pnpm ≥ 8 enforced via `engines` field

#### Documentation

- `docs/01-VISION.md` — Why GO IRL exists
- `docs/02-ARCHITECTURE.md` — System design and boundaries
- `docs/03-DATABASE.md` — Data model
- `docs/04-API.md` — API contract overview
- `docs/05-ROADMAP.md` — Sprint plan
- 5 Architecture Decision Records (ADRs)

#### Backend (Fastify + Prisma + PostgreSQL)

- HTTP server with CORS and global rate limiting (100 req/min)
- `POST /api/auth/telegram` — Telegram initData verification + user upsert
- `GET /api/me` — current user via initData
- `GET /api/activities` — list all activities
- `GET /api/activities/:id` — activity detail with participants
- `POST /api/activities` — create activity (auth required)
- `POST /api/activities/:id/join` — join activity (auth required)
- Graceful shutdown on SIGINT/SIGTERM
- Health check endpoint `GET /health`

#### Database Schema

- `User` — Telegram identity, BigInt telegramId
- `Activity` — geo-located events with status and participant cap
- `ActivityParticipant` — composite join table with timestamp

#### Telegram MiniApp (React + Vite)

- Session restore from `sessionStorage`
- `useTelegramAuth` hook — login + auto-restore
- `useActivities` hook — activity list
- `useActivityDetails` hook — activity detail with auto-fetch on mount
- `ActivityDetailsPage`, `ProfilePage`, `LoginPage`
- API client in `src/services/api.ts`

#### CI Pipeline (GitHub Actions)

- `lint` — ESLint + Prettier format check (`format:check`)
- `typecheck` — TypeScript `--noEmit` across all packages
- `build` — turbo build (depends on lint)
- `docker-compose-validate` — docker compose config validation
- Explicit `permissions: contents: read` on all jobs

#### Infrastructure

- `Dockerfile.backend` — multi-stage Node.js 20 Alpine
- `docker-compose.yml` — PostgreSQL 16 + n8n
- `.env.example` — all required environment variables documented

---

### Bug Fixes (Sprint 0 Audit)

10 confirmed bugs resolved before the foundation release. See `CHANGELOG.md`
for the full technical record and `.ai/audit-revision-2.txt` for proof.

---

### What This Release Does NOT Include

- Tests (none written yet — Sprint 1)
- Authentication sessions / JWT / refresh tokens
- Geo-verification of attendance
- Reviews and ratings
- Chat
- Mobile apps

---

### Requirements to Run

```bash
node >= 20.0.0
pnpm >= 8.0.0
PostgreSQL 16 (via docker-compose or external)
TELEGRAM_BOT_TOKEN (required at runtime)
DATABASE_URL (required at runtime)
```
