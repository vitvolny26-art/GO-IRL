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
