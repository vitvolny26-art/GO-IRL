# Changelog

All notable confirmed changes to GO IRL are tracked here.

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
- Inline skating ("Ролики") is available as a first-class activity category.
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

### Changed

- Documentation now reflects the Supabase-backed runtime instead of local-only storage.
- Invite activity id from Telegram `startapp` is sent to Supabase as a scoped request header.
- Package versions are pinned to explicit semver ranges instead of `latest`.
- Event cards now show clearer activity, date, time, location, participants, price, organizer RLI placeholder, and direct join/request action.
- Roadmap now tracks AI event discovery sources and evening n8n digest constraints.
- Vertical architecture now treats Sport as the first production reference vertical while Dating, Friends, Food, Travel, and Culture stay future modules.
- Production Supabase schema was updated and verified on 2026-07-04 with `city_id`, `metadata`, `participant_note`, and `activity_type` stored in the database.

### Known Gaps

- Telegram `initData` validation still needs a production backend or secure edge function.
