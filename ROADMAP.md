# Roadmap: GO IRL

**North Star Metric:** 100 confirmed real-life meetings.

Not DAU. Not session time. Not feature count.

---

## ✅ Sprint 0 — Foundation (DONE)

> Goal: Minimal working codebase that any new engineer understands in 30 minutes.

| # | Deliverable | Status |
|---|---|---|
| 1 | Repository structure & monorepo setup | ✅ Done |
| 2 | Documentation (Vision, Architecture, DB, API, Roadmap, ADRs) | ✅ Done |
| 3 | AI context files (`.ai/`) | ✅ Done |
| 4 | Backend skeleton (Fastify, Prisma, routes, services) | ✅ Done |
| 5 | Telegram MiniApp skeleton (React, Vite, hooks, pages) | ✅ Done |
| 6 | CI pipeline (lint, typecheck, build, docker-compose-validate) | ✅ Done |
| 7 | Audit & bug fixes (10 confirmed bugs resolved) | ✅ Done |

**Release:** v0.1.0

---

## 🟡 Sprint 1 — MLP (Next)

> Goal: First real users can discover, create, and join activities.

**Blocked on:** architecture review approval.

| Feature | Description |
|---|---|
| 🔐 Authentication | JWT tokens, session management |
| 👤 User Profile | Name, photo, activity history |
| 📍 Browse Activities | Map view + list with filters |
| ➕ Create Activity | Form with geo-picker, type, time, cap |
| ✅ Join Activity | One-tap join with optimistic UI |
| 🧪 Tests | Unit tests for backend services and frontend hooks |
| 🐳 Docker CI | Backend Docker build in CI pipeline |

**Success criteria:**
- Real Telegram user can open MiniApp, see activities, join one.
- All tests pass in CI.

---

## Sprint 2 — Trust & Verification

> Goal: Build trust through verified real-life participation.

| Feature | Description |
|---|---|
| 📍 Geo-verification | Confirm attendance within GPS radius |
| ⭐ Reviews | Post-event reviews between participants |
| 🤝 Trust Score | Simple weighted score per user |

**Success criteria:**
- Verified participation rate > 70% in pilot activities.

---

## Sprint 3 — Sport Vertical Excellence

> Goal: One vertical (Sport) becomes best-in-class.

| Feature | Description |
|---|---|
| 🏐 Sport-specific fields | Sport type, skill level, format |
| 🔍 Advanced search | Filter by skill level, sport, distance |
| 💬 Activity Chat | Real-time chat per activity (WebSocket) |
| 📅 Calendar | Export to Google / Apple calendar |

**Success criteria:**
- Sport activities have 2× higher join rate vs other types.

---

## Beyond Sprint 3

| Area | Items |
|---|---|
| Verticals | Nature, Learning, Creative |
| Organizations | Team accounts, recurring activities |
| AI | Activity recommendations, smart matching |
| Mobile | React Native or Flutter apps |
| Marketplace | Ticketed events, paid experiences |

---

## Milestone: 100 Real Meetings

When GO IRL reaches 100 confirmed real-life meetings, Sprint 0–3 is considered
a success and the product enters growth phase.

---

## Architecture Constraints (from ADRs)

- Platform-first: business logic lives in `backend/src/platform/`
- Adapters (HTTP, WebSocket, bot) depend on platform, never the other way
- No business logic in routes
- `packages/*` are dependency-free utilities only
- `apps/*` are delivery shells that depend on `packages/*` and call `backend` via API
