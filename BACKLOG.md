# Backlog

Items listed here are not started. They become Sprint tasks after approval.

Priority order is indicative, not fixed.

---

## Sprint 1 — MLP (Minimum Lovable Product)

> Goal: First users can discover, create, and join real activities via the Telegram MiniApp.

### Authentication & Identity

- [x] `BACK-101` Implement JWT session tokens (issue + refresh)
- [ ] `BACK-102` Token expiry and rotation — JWT uses `expiresIn: 7d`; refresh endpoint not yet implemented
- [x] `FRONT-101` Store JWT in `sessionStorage`, attach to all API requests

### Activity Discovery

- [ ] `FRONT-102` Map view — display activities on a Leaflet/Mapbox map by geo-coordinates
- [x] `FRONT-103` Activity list with activity cards
- [x] `FRONT-104` Activity card component

### Activity Creation

- [x] `FRONT-105` Create Activity form — title, description, type, location picker, date/time, participant cap
- [x] `BACK-103` Input validation on all POST routes

### Join Flow

- [x] `FRONT-106` Join button with optimistic UI
- [x] `FRONT-107` Already-joined state — show "Leave" button
- [x] `BACK-104` `DELETE /api/activities/:id/leave` route

### Profile Page

- [x] `FRONT-108` User profile page — name, photo, member since, stats, account info

### Error Handling

- [x] `FRONT-109` Global error boundary in React
- [x] `FRONT-110` Toast notifications for API errors
- [x] `BACK-105` Structured error responses — `{ success: false, error: string, code: string }`

### Tests

- [x] `TEST-101` Backend unit tests for `IdentityService.verifyInitData`
- [x] `TEST-102` Backend unit tests for `ActivityService` (mock Prisma)
- [ ] `TEST-103` Frontend component tests for `useTelegramAuth`
- [ ] `TEST-104` Frontend component tests for `useActivityDetails`
- [x] `TEST-105` CI: add test job to `ci.yml`

### CI / Infrastructure

- [ ] `INFRA-101` Add `pnpm-lock.yaml` integrity check to CI
- [ ] `INFRA-102` Docker build check for `Dockerfile.backend` in CI
- [x] `INFRA-103` Environment variable validation at startup (`TELEGRAM_BOT_TOKEN` + `JWT_SECRET`)

---

## Sprint 2 — Trust & Verification

> Goal: Build trust through verified real-life participation.

- [ ] `BACK-201` Geo-verification endpoint — confirm attendance within radius
- [ ] `BACK-202` `ActivityParticipant.verifiedAt` field + migration
- [ ] `BACK-203` Reviews — `POST /api/activities/:id/review` (after event ends)
- [ ] `BACK-204` Trust Score calculation (simple weighted average)
- [ ] `FRONT-201` Verified badge on participant list
- [ ] `FRONT-202` Post-event review form
- [ ] `FRONT-203` User trust score display on profile

---

## Sprint 3 — Sport Vertical Excellence

> Goal: One vertical (Sport) becomes best-in-class.

- [ ] `BACK-301` Sport-specific activity fields (sport type, skill level, format)
- [ ] `BACK-302` Sport activity search and filtering
- [ ] `FRONT-301` Sport-specific creation form
- [ ] `FRONT-302` Skill level badge on participant list
- [ ] `UX-301` Refined onboarding flow based on Sprint 1–2 user feedback

---

## Beyond Sprint 3 (Future)

- [ ] Activity chat (WebSocket, `@fastify/websocket` is already installed)
- [ ] Calendar integration (add to Google / Apple calendar)
- [ ] Additional verticals: Nature, Learning, Creative
- [ ] Organization accounts
- [ ] AI activity recommendations
- [ ] Native mobile apps (React Native or Flutter)
- [ ] Marketplace / ticket features

---

## Technical Debt

- [ ] `DEBT-001` Remove `supabase` from `pnpm-workspace.yaml` — no `package.json` in that directory (causes pnpm workspace warning)
- [ ] `DEBT-002` Migrate from `.eslintrc.json` to `eslint.config.js` (ESLint flat config — required in ESLint v9+)
- [ ] `DEBT-003` Add `typecheck` script to `backend/package.json`
- [ ] `DEBT-004` Replace `node --loader ts-node/esm` dev command with `tsx` (more stable ESM loader)
- [ ] `DEBT-005` Add `pnpm audit` step to CI
