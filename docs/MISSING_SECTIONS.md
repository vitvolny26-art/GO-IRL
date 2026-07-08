# Missing Sections Registry

Generated: 2026-07-08
Updated: 2026-07-08

## Purpose

This file lists missing documentation sections that must be filled before GO IRL MVP 1.1 can be considered documentation-clean.

This is not a feature wishlist. It is a boundary file for AI developers so they do not invent behavior or expand scope accidentally.

## Missing / incomplete sections

| Section | Status | Must document | Target docs |
|---|---|---|---|
| Market positioning and beta feature filter | Fixed / keep maintained | GO IRL as Telegram-first local meetup layer; not event calendar, ticketing, sport-only app, dating app, or social feed. | `docs/MARKET_POSITIONING.md`, `ROADMAP.md`, `BACKLOG.md`, `DOCS_INDEX.md` |
| Competitor boundaries | Fixed / keep maintained | Competitor signals are watch inputs only; they must not auto-create MVP scope. | `docs/COMPETITOR_WATCH.md`, `docs/MVP_DOC_AUDIT.md` |
| Bible guardrails | Contained / not complete | Bible files are preserved drafts/future vision; they cannot override current beta scope, code, Supabase schema, auth, or RLS. | `docs/bible/*`, `DOCS_INDEX.md`, `docs/MVP_DOC_AUDIT.md` |
| Telegram Mini App constraints | Missing | `initData`, trusted auth path, explicit close, no surprise close, no background polling, Telegram client testing. | `README.md`, `docs/GO_IRL_CONSTITUTION.md`, `BETA_TESTING.md` |
| Browser Demo Mode | Missing / scattered | Browser without Telegram, fake user `999999`, `Vit_Test`, Olomouc demo events, no production Supabase writes, demo save message. | `README.md`, `BETA_TESTING.md`, `docs/MVP_STABILIZATION_PLAN.md` |
| Activity Chat MVP boundary | Missing / scattered | Chat opens after join, temporary coordination only, current expiry behavior, no full messenger scope, no advanced moderation claims. | `README.md`, `docs/EventLifecycle.md`, `docs/MVP_STABILIZATION_PLAN.md` |
| Chat 24-hour limit | Missing | Current/future rule for chat expiry: clarify if chat expires 24h after creation or 24h after event start/end. | `docs/EventLifecycle.md`, `docs/MVP_STABILIZATION_PLAN.md` |
| Sport Coach actual UI | Partly fixed | `CoachRequestPanel.tsx` as current v1.1 basis; Role Choice and Review Flow as future. | `docs/SPORT_COACH_MVP.md` |
| Weather Widget boundary | Missing / scattered | Open-Meteo no-key API, forecast available only inside API range, event >7 days message, hourly summary for <=7 days. | `README.md`, `docs/MVP_STABILIZATION_PLAN.md` |
| Share / Join flow | Partly documented | Telegram Mini App `startapp`, `/join/:id`, no App Store redirect on iOS, Open Graph behavior. | `README.md`, `BETA_TESTING.md`, `RELEASE_NOTES.md` |
| Release source of truth | Partly fixed | Vercel-first beta/deploy flow, historical Netlify snapshots not current truth. | `DEPLOYMENT.md`, `BETA_CHECKLIST.md`, `DOCS_INDEX.md` |
| Bible completion | Incomplete | Existing archive is not final; define missing chapters and MVP 1.0/1.1 final Bible plan after product review. | `docs/bible/00-completion-audit.md`, `docs/bible/00-bible-roadmap.md` |
| Supabase schema vs docs | Needs audit | Compare `docs/Database.md`, Bible database chapter, `supabase/schema.sql`, migrations, current code types. | `docs/Database.md`, `docs/MVP_DOC_AUDIT.md` |

## Hard boundaries for AI developers

Do not generate code from:

- `SETUP.md`
- `SETUP_RU.md`
- `SPRINT0_STATUS.md`
- `CHECKLIST.md`
- `PATCH_REPORT.md`
- `GO_IRL_DOCUMENTATION.md`

These are historical snapshots or deprecated local-development artifacts.

Do not treat future vision as current MVP:

- universal Event Roles;
- coach marketplace;
- payments;
- ticketing;
- club CRM;
- subscriptions or premium plans;
- verified coach badge;
- full review flow;
- public ratings/reviews;
- direct messages;
- complex profiles;
- RLI / Trust Score / achievements;
- AI event discovery;
- AI recommendations;
- full notification automation;
- broad Friends/Travel/Dating vertical expansion;
- big multi-city catalog;
- full module registry;
- REST API / WebSocket / background workers / event bus rewrite.

## MVP 1.1 current working boundary

Current GO IRL MVP 1.1 focus:

```text
Olomouc beta
Telegram Mini App
Create event
Share event
Join event
Event chat
People meet in real life
Sport-first Coach stabilization
Weather and share/join polish
Browser demo mode without production writes
```

Canonical beta categories:

```text
Volleyball
Running
Walking
Coffee meetup
Board games
Language exchange
```

## Next documentation patches

1. Add Telegram Mini App constraints section to `README.md`.
2. Add Browser Demo Mode section to `BETA_TESTING.md`.
3. Add Activity Chat boundary section to `docs/EventLifecycle.md`.
4. Add Weather Widget boundary section to `docs/MVP_STABILIZATION_PLAN.md`.
5. Audit `DEPLOYMENT.md` for Vercel-first release flow.
