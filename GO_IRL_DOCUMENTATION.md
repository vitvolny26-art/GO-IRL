> ⚠️ **HISTORICAL SNAPSHOT / DEPRECATED**
>
> Этот документ является историческим артефактом Sprint 0 / локальной разработки.
>
> Актуальные инструкции см. в `README.md` и `DOCS_INDEX.md`. Не использовать для генерации кода!

# GO IRL Project Documentation

## 1. Git Status
``
?? GO_IRL_DOCUMENTATION.md
?? project-audit/

83f252a (HEAD -> main, origin/main, origin/HEAD) fix: remove broken coach and chat panels causing black screen on card open
a577f1d Add detailed weather forecasts for outdoor events
2e333e5 Improve notification system and update sharing link
ff57f0a Update project to use correct pnpm version for deployments
2df9e07 Saved progress at the end of the loop
32af3ba Merge pull request #5 from vitvolny26-art/fix/toast-feedback-v2
1ae62a0 (origin/fix/toast-feedback-v2) fix(vercel): restore root vite build
b3b1565 Merge pull request #4 from vitvolny26-art/fix/toast-feedback-v2
5aa2cbf fix(vercel): build only go irl app
766b89a (origin/fix/toast-feedback) ux: use sonner toast for notices
8003751 ux: replace custom notice with sonner toast
aa869ee ux: replace alert with toast for share
d2c8b4b fix: dynamic dev port
30ca07e feat: send feedback to supabase
673c776 ux: connect feedback form to UI
0b39a22 ux: add feedback MVP instead of bug copy
5f3592c Update task list and record project lessons
5a06aed Add a shareable link to events with custom social media previews
062cfde Replace alerts with a custom notice system for user feedback
954183f Update translations for skill matching across multiple languages
``

## 2. README.md
``
# GO IRL Telegram Mini App

![GO IRL logo](public/brand/logo-wide.png)

Before contributing or implementing new features, read:

1. [docs/PRODUCT_PHILOSOPHY.md](docs/PRODUCT_PHILOSOPHY.md)
2. [docs/GO_IRL_CONSTITUTION.md](docs/GO_IRL_CONSTITUTION.md)

Every major product or architecture decision must support the mission:

**Less scrolling. More living.**

If a feature increases screen time but does not increase real-life meetings, it should be reconsidered.

GO IRL (Go In Real Life) is a Telegram Mini App for creating and joining offline activities, starting with Olomouc.

All major product and architecture decisions must follow the [GO IRL Constitution](docs/GO_IRL_CONSTITUTION.md).

## Current Stack

- React, TypeScript, Vite
- Zustand for client state
- Supabase for activities, participants, private join requests, and realtime updates
- Telegram WebApp bootstrap with trusted `initData` verification through Supabase Edge Functions
- Telegram Mini App lifecycle helpers for ready, expand, back, and explicit close actions
- Dark mobile-first UI with safe-area aware header
- Brand assets in `public/brand/`

## Setup

```powershell
pnpm install
pnpm run dev
```

Create `.env.local` from `.env.example` and fill:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_TELEGRAM_BOT_USERNAME=GOirl_bot
VITE_GO_IRL_ADMIN_KEYS=telegram:123456789,telegram_username:yourusername
# Optional local-only compatibility mode. Never enable for public production.
VITE_GO_IRL_LEGACY_DEMO_AUTH=false
```

Security note: `VITE_GO_IRL_ADMIN_KEYS` is DEV/DEMO ONLY. Every `VITE_*` value is bundled into public frontend JavaScript. Do not put real production admin identifiers there.

Trusted auth note: production auth uses `Telegram.WebApp.initData` -> `verifyTelegramInitData` Supabase Edge Function -> verified JWT -> Supabase RLS. The old `x-go-irl-user-key` model is now legacy demo mode only and must stay disabled in public production.

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
- Save Activity to Google Calendar through a template link without Google OAuth
- Share link that opens the Telegram Mini App with `startapp`
- City selection architecture with Olomouc as the first city
- City expansion with Praha/Prague available through configuration
- Russian, Ukrainian, Czech, and English localization architecture
- Sprint 1 temporary admin allowlist for organizer/admin event deletion
- Safe-area aware fixed header for Telegram Mini App
- Explicit "Done" / "Back to Telegram" UX; the Mini App closes only after a user action
- Sport Vertical MVP with sport-specific card, details, create fields, and matching engine
- ActivityRendererRegistry with Sport and Generic registrations for future vertical expansion
- GO IRL brand logo, favicon, app icon, and Open Graph preview
- Supabase schema and RLS policies in `supabase/schema.sql`
- Supabase Edge Function `verifyTelegramInitData` for Telegram HMAC verification and trusted session issuing
- Supabase setup guide in `supabase/README.md`
- ESLint and Vitest quality gates
- Netlify build configuration in `netlify.toml`
- Vercel fallback deployment configuration in `vercel.json`

## Project Documents

- `docs/PRODUCT_PHILOSOPHY.md` - product manifesto and mission
- `docs/GO_IRL_CONSTITUTION.md` - product and architecture source of truth
- `CHANGELOG.md` - shipped changes
- `ROADMAP.md` - product and engineering direction
- `SPRINTS.md` - sprint-by-sprint delivery plan
- `SPRINT0_STATUS.md` - current Sprint 0 production verification status
- `BACKLOG.md` - confirmed work queue
- `RELEASE_NOTES.md` - release-ready notes for deployment
- `DEPLOYMENT.md` - production deployment and smoke-test checklist
- `supabase/README.md` - Supabase setup, migration, RLS, env, and verification guide
- `docs/Database.md` - target database architecture for users, interests, discovery, digest, and optional activity chat
- `docs/vertical-experiences.md` - vertical modules architecture for sport, dating, friends, food, and generic fallback
- `docs/performance.md` - code splitting, bundle strategy, and vertical loading rules
- `docs/AI.md` - AI platform, discovery, normalization, duplicate detection, and privacy guardrails
- `docs/ai-event-discovery.md` - AI event discovery pipeline plan
- `docs/Notifications.md` - notification preferences, evening digest, and chat notification rules
- `docs/n8n-workflows.md` - future n8n workflow architecture
- `docs/privacy.md` - privacy-first product architecture
- `docs/Security.md` - RLS, permissions, token, abuse, and audit strategy
- `docs/RLS.md` - table-by-table Supabase RLS design
- `docs/Admin.md` - admin roles, permissions, and future admin surfaces
- `docs/Moderation.md` - report, block, moderation hold, and audit architecture
- `docs/RecommendationEngine.md` - recommendation engine v2 architecture
- `docs/reputation.md` - RLI, Trust Score, Community Contribution, attendance confirmation, and reputation privacy
- `docs/EventLifecycle.md` - Activity lifecycle from creation to archive
- `docs/UserLifecycle.md` - user lifecycle from registration to deletion
``

## 3. ROADMAP.md
``
# Roadmap

GO IRL is being built as a platform, not a one-off Telegram Mini App. New work should stay compatible with future web, Android, and iOS clients.

All major product and architecture decisions must follow [docs/GO_IRL_CONSTITUTION.md](docs/GO_IRL_CONSTITUTION.md).

## Strategic Development Order

The current product priority is foundation and infrastructure. Friends, Travel, and Dating are intentionally deferred until the platform layer is stable.

1. Infrastructure Hardening
   - Supabase production readiness.
   - Safe, repeatable migrations.
   - RLS hardening for all user and event data.
   - Roles and permission enforcement.
   - Database verification SQL and release checklist.
   - Remove dependency on local fallback where possible after production migration is applied.
2. Performance
   - Lazy loading.
   - Code splitting.
   - Bundle optimization.
   - Telegram Mini App startup performance.
3. n8n Notifications
   - Server-side notification workflow.
   - Evening digest.
   - Working hours.
   - Quiet hours.
   - No Mini App background work.
4. AI Event Discovery
   - External sources.
   - Event collection.
   - AI normalization.
   - Duplicate detection.
   - Confidence scoring.
   - Save discovered events to the database.
5. Friends Vertical
   - Start only after database and notification foundation is stable.
6. Travel Vertical
   - Start only after Friends and source discovery architecture are stable.
7. Dating Vertical
   - Last, because it requires privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection.

## Phase 1 - Production Foundation

- CRITICAL SECURITY BLOCKER BEFORE PUBLIC RELEASE: replace the frontend-controlled `x-go-irl-user-key` RLS model with trusted Telegram auth.
- Keep build and TypeScript checks green.
- Preserve the current generic event MVP as the fallback experience.
- Sprint 2 architecture docs are prepared: Constitution, Database, RLS, Admin, Security, Notifications, AI, EventLifecycle, UserLifecycle, RecommendationEngine, Moderation.
- Keep Sport as the current reference vertical without expanding into Friends, Travel, or Dating yet.
- Harden Supabase RLS and document every policy.
- Apply backend foundation migration v2 for `user_roles`, moderator/admin helpers, audit log, and verification SQL.
- Apply security hardening migration v3 for DB-level text length constraints.
- Implement Supabase Edge Function for Telegram `initData` HMAC verification.
- Move RLS from request headers to verified auth context.
- Remove public frontend admin allowlist from production security model.
- Chat data model for optional, temporary Activity Chat.
- Chat RLS design with participant-only access.
- Chat toggle in Activity settings as an architecture item, not runtime UI yet.
- Apply and verify migrations for `city_id`, `metadata`, `participant_note`, and `activity_type`.
- Add database verification SQL to release flow.
- Replace local fallback as the primary source of truth once production schema is verified.
- Add Telegram `initData` validation on a trusted backend or edge function.
- Keep Telegram Mini App lifecycle explicit: no surprise close, no background polling, user-triggered close only.
- Privacy settings placeholder.
- No background tracking policy.
- User notification opt-in design.
``
