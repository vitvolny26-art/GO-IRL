# Changelog

All notable confirmed changes to GO IRL are tracked here.

## Unreleased

### Added

- Added `docs/MARKET_POSITIONING.md` as the market positioning source of truth for GO IRL beta.
- Added `docs/COMPETITOR_WATCH.md` to track competitor signals and product mechanics worth borrowing.
- Documented Sport Coach MVP 1.1 as the next narrow beta focus.
- Added `docs/SPORT_COACH_MVP.md` with scope, UX guardrails, beta metrics, roadmap, and Event Roles boundaries.
- Added Browser Mock Mode reports and beta checklist coverage for non-Telegram browser testing.
- Added per-task audit reports for Browser Mock Mode, Event Card Time Fix, Profile Fix, Bug Report Fix, Weather Widget, Share Fix, Documentation Update, and Beta UI Cleanup.

### Changed

- Aligned `README.md`, `DOCS_INDEX.md`, `ROADMAP.md`, and `BACKLOG.md` with the Telegram-first local meetup positioning.
- Added beta guardrails that block ticketing, payments, club CRM, AI recommendations, dating, broad social feed, complex profiles, and multi-city expansion before the Olomouc loop is stable.
- Clarified the canonical beta categories: Volleyball, Running, Walking, Coffee meetup, Board games, and Language exchange.
- Marked Bible foundation, core principles, platform architecture, database design, modules architecture, PRD, and UX guide as historical/future-scope drafts where needed so they cannot override current beta scope.
- Clarified that Bible references to REST API first, background workers, event bus, RLI, Trust Score, achievements, broad modules, AI, verification, and large platform architecture are future vision unless explicitly re-approved.
- Clarified that Coach means sport-only in MVP 1.1.
- Clarified that guides, tutors, language buddies, game masters, hosts, referees, and paid role marketplace work belong to future Event Roles phases.
- Updated roadmap priority to validate Sport Coach through show-up rate and beginner comfort before universal role expansion.
- Browser without Telegram `initData` now uses local demo state instead of production Supabase write paths.
- Sport cards now show event start time consistently instead of sport duration.
- Static beta/dev marker and debug panel were removed from `index.html`.
- `BETA_CHECKLIST.md` now matches the current local demo-write behavior.

### Verification

Latest local quality gates are **pending after the newest commits**:

- `pnpm run lint`: pending
- `pnpm run build`: pending
- `pnpm run test`: pending

Do not claim beta-ready until these pass on the latest `main`.

## 0.1.0 - 2026-07-03

### Added

- Sprint delivery plan covering Sprint 0 through Sprint 5.
- Telegram Mini App MVP for GO IRL.
- Supabase-backed activities and participants.
- Public/private activity visibility.
- Organizer editing for activities.
- Private activity join requests with approve/reject review.
- Participant states: joined, waiting, pending.
- Share links using the Telegram `startapp` parameter.
- Safe-area aware fixed header with city selector, language selector, and notification entry point.
- City configuration architecture with Olomouc as the first supported city.
- Russian and Czech localization architecture.
- Activity creation fields for category, activity type, location address, and optional location URL.
- ESLint flat config and `pnpm run lint`.
- Vitest and unit coverage for city configuration, activity taxonomy, and localization basics.
- Supabase RLS helper functions and policies that hide non-public activities from unrelated users.
- Production deployment checklist for Supabase, Netlify, BotFather, and Telegram smoke testing.
- GitHub Actions CI for test, lint, and build verification.
- Sprint 0 production verification completed after applying Supabase RLS schema.
- Netlify build configuration for automatic GitHub deploys.
- Telegram bot username can be configured with `VITE_TELEGRAM_BOT_USERNAME`.
- Vite output filenames now use a `go-irl-v0` prefix to avoid stale Netlify asset reuse.
- Vercel deployment configuration as a fallback when Netlify deploys are unavailable.
- Sprint 1 home screen now works as an action dashboard with city context, metrics, quick actions, and category counts.
- Ukrainian and English localization options.
- Praha/Prague city configuration.
- Inline skating (`Ролики`) is available as a first-class activity category.
- Organizer/admin event delete flow with confirmation and Supabase RLS planning.
- GO IRL brand logo assets, favicon, and Open Graph preview.
- Create Event validation for required text, length limits, capacity, and price.
- Production-ready Create Event flow with quick templates, city selection, participant notes, URL/date validation, and post-create actions.
- Discover / For You screen with instant search, quick filters, horizontal recommendation sections, and profile-based favorite activities.
- Recommendation engine interface with a simple city/interests/date/free-spots matching implementation ready for future AI replacement.
- Sprint 2 Sport Vertical MVP with ActivityRendererRegistry, SportActivityCard, Sport details, Sport create fields, sport demo data, and SportRecommendationEngine.
- GO IRL Constitution as the product and architecture source of truth.
- Google Calendar save action for activities using a template link without Google OAuth.
- Sprint 2/3 architecture documentation pack: AI, Admin, Moderation, RLS, RecommendationEngine, EventLifecycle, UserLifecycle, Database, Notifications, and Security.
- Optional Activity Chat architecture with temporary participant-only chat, auto-archive policy, n8n cleanup, and privacy/safety rules.
- Supabase backend foundation migration v2 with `user_roles`, role-aware RLS helpers, `audit_log`, and verification SQL.
- Reputation architecture for RLI, hidden Trust Score, Community Contribution, attendance confirmation, event confidence, and RLI ledger.
- Trusted Telegram auth implementation with Supabase Edge Function, HMAC validation, replay protection, app user upsert, verified JWT sessions, frontend `accessToken` integration, and RLS migration v4.

### Changed

- Documentation now reflects the Supabase-backed runtime instead of local-only storage.
- Invite activity id from Telegram `startapp` is sent to Supabase as a scoped request header.
- Package versions are pinned to explicit semver ranges instead of `latest`.
- Event cards now show clearer activity, date, time, location, participants, price, organizer RLI placeholder, and direct join/request action.
- Roadmap now tracks AI event discovery sources and evening n8n digest constraints.
- Vertical architecture now treats Sport as the first production reference vertical while Dating, Friends, Food, Travel, and Culture stay future modules.
- Production Supabase schema was updated and verified on 2026-07-04 with `city_id`, `metadata`, `participant_note`, and `activity_type` stored in the database.
- Security documentation now treats `user_roles` as the forward-compatible role model and `admin_users` as backward compatibility.
- Legacy `x-go-irl-user-key` auth is restricted to explicit dev/demo mode; production auth uses verified Telegram `initData`.

### Known Gaps

- Public beta still requires latest local quality gates and real Telegram/Supabase smoke verification.
