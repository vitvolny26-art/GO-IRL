# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] — Sprint 1

### Added

- **backend**: `leaveActivity` method in `ActivityService` — removes participant, throws `Not a participant` if not joined
- **backend**: `Already joined` guard in `joinActivity` — prevents duplicate join
- **backend**: `DELETE /api/activities/:id/leave` route
- **backend**: `code` field on all error responses — structured `{ success: false, error, code }` (`BACK-105`)
- **backend**: Input validation on `POST /api/activities` — title, type, lat/lng, startTime, maxParticipants (`BACK-103`)
- **backend**: JWT token issuance — `IdentityService.issueToken` / `verifyToken` using `jsonwebtoken` (`BACK-101`)
- **backend**: `JWT_SECRET` env var required at startup alongside `TELEGRAM_BOT_TOKEN` (`INFRA-103`)
- **backend**: Auth routes return `token` in response alongside `user`
- **backend**: `vitest@3.2.6` dev dependency + `vitest.config.ts`
- **backend**: `typecheck` script added to `backend/package.json` (`DEBT-003`)
- **backend/tests**: `IdentityService.verifyInitData` — 4 unit tests (`TEST-101`)
- **backend/tests**: `ActivityService` — 11 unit tests covering list, get, create, join, leave (`TEST-102`)
- **miniapp**: `ActivitiesListPage` — activity list with `ActivityCard` components (`FRONT-103/104`)
- **miniapp**: `CreateActivityPage` — full form: title, description, type selector, geo-picker (use my location), start/end time, max participants (`FRONT-105`)
- **miniapp**: `ActivityDetailsPage` — join/leave toggle with optimistic UI, `Already joined` state (`FRONT-106/107`)
- **miniapp**: `ProfilePage` — member since date, stats row, account info, logout button (`FRONT-108`)
- **miniapp**: `ErrorBoundary` component — catches render errors, shows retry button (`FRONT-109`)
- **miniapp**: `ToastProvider` + `useToast` hook — auto-dismissing toasts for success/error/info (`FRONT-110`)
- **miniapp**: Full multi-page navigation in `App.tsx`: list → details → create → profile
- **miniapp**: `leaveActivity` API call in `services/api.ts` (`BACK-104`)
- **miniapp**: `createActivity` API call in `services/api.ts`
- **miniapp**: JWT stored in `sessionStorage` via `setStoredToken`, attached as `Authorization: ****** header on activity requests (`FRONT-101`)
- **miniapp**: `clearSession()` helper — removes all session storage keys on logout
- **ci**: `test` job added to `ci.yml` — runs `pnpm run test --filter @go-irl/backend` (`TEST-105`)

### Fixed

- **miniapp/hooks**: Removed invalid `react-hooks/exhaustive-deps` eslint disable comment (plugin not installed)
- **miniapp/App.tsx**: `setAppReady(true)` now always called regardless of Telegram WebApp availability

---

## [0.1.0] — 2026-07-01

### Added

- **backend**: Fastify HTTP server with CORS and global rate-limit (`@fastify/rate-limit`)
- **backend**: `IdentityService` — Telegram initData HMAC verification + `findOrCreateUser`
- **backend**: `ActivityService` — `listActivities`, `getActivityById`, `createActivity`, `joinActivity`
- **backend**: `POST /api/auth/telegram` and `GET /api/me` routes
- **backend**: `GET /api/activities`, `GET /api/activities/:id`, `POST /api/activities`, `POST /api/activities/:id/join`
- **backend**: `serializeUser()` — converts `bigint` telegramId to `string` for JSON responses
- **backend**: Prisma schema — `User`, `Activity`, `ActivityParticipant` models
- **backend**: `backend/prisma/seed.ts` — database seed script
- **backend**: Graceful shutdown (SIGINT, SIGTERM)
- **miniapp**: `useTelegramAuth` hook with sessionStorage session restore
- **miniapp**: `useActivityDetails` hook — auto-fetches on mount via `useEffect`
- **miniapp**: `ActivityDetailsPage`, `ProfilePage`, `LoginPage`
- **miniapp**: Full Vite + React + TypeScript setup (`tsconfig.json`, `vite.config.ts`)
- **miniapp**: `Dockerfile` for Telegram MiniApp
- **packages**: `@go-irl/types` — `Activity`, `User` TypeScript interfaces
- **packages**: `@go-irl/shared` — `theme.ts`, `constants.ts`
- **packages**: `@go-irl/contracts` — `auth.ts`, `sport.ts`
- **root**: `turbo.json` — pipeline: build, lint, test, typecheck, dev, format, clean
- **root**: `format:check` script — `prettier --check` (direct, not via turbo)
- **root**: `typecheck` script — `turbo run typecheck`
- **root**: `engines` field — Node ≥ 20, pnpm ≥ 8
- **root**: `tsconfig.base.json`, `tsconfig.build.json`
- **root**: `.npmrc` — `shamefully-hoist=false`, `strict-peer-dependencies=false`
- **ci**: `typecheck` job replacing broken `docker-build` job
- **ci**: `permissions: contents: read` on all jobs (global + per-job)
- **infra**: `infra/docker/Dockerfile.backend` and `infra/docker/docker-compose.yml`

### Fixed

- **eslint**: Rule name `explicit-function-return-types` → `explicit-function-return-type`
- **ci**: `pnpm run format --check` → `pnpm run format:check` (prettier was not actually checked before)
- **ci**: `docker-compose` (v1, removed from ubuntu-latest) → `docker compose` (v2)
- **ci**: Removed `docker-build` job that passed `docker-compose.yml` as a Dockerfile to buildx
- **dockerfile**: `CMD ["node", "dist/src/main.js"]` → `CMD ["node", "dist/main.js"]` (matches tsconfig outDir)
- **backend/package.json**: `"start"` script `dist/src/main.js` → `dist/main.js`
- **gitignore**: Removed `pnpm-lock.yaml` exclusion — lockfile is now committed (required for `--frozen-lockfile`)
- **miniapp/types**: `telegramId: bigint` → `telegramId: string` in `User` interface and `AuthResponse`
- **miniapp/hooks**: `useActivityDetails` — added missing `useEffect` to trigger `fetchActivity()` on mount
- **miniapp/hooks**: Initial `loading` state corrected to `false` (fetch not yet started on init)
- **backend/routes**: Import paths `../../platform/...` → `../../../platform/...` (depth was wrong by one level)
- **backend/package.json**: `@fastify/websocket: ^10.1.1` (non-existent) → `^8.3.1`
- **backend/tsconfig**: Added `"module": "Node16"` and `"moduleResolution": "Node16"`

### Changed

- **miniapp/App.tsx**: Removed unused import `type { User } from './types/user'`
- **miniapp/services/api.ts**: Added `status` and `createdAt` fields to `ActivitiesResponse`
- **packages/contracts/src/index.ts**: Exports `auth` and `sport`
- **packages/shared/src/index.ts**: Exports `theme` and `constants`
- **packages/types/src/index.ts**: Exports `activity` and `user`

---

## [0.0.1] — 2026-06-28

### Added

- Initial repository structure
- `README.md`, `CONTRIBUTING.md`, `.gitignore`
- `docs/01-VISION.md` through `docs/05-ROADMAP.md`
- ADRs: 0000–0004
- `.ai/` context files: `PRODUCT_CONTEXT.md`, `ARCHITECTURE_RULES.md`, `CURRENT_SPRINT.md`
- Backend skeleton (empty services, stub routes)
- Telegram MiniApp skeleton (dev/build scripts only)
