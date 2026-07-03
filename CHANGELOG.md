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

### Changed

- Documentation now reflects the Supabase-backed runtime instead of local-only storage.
- Invite activity id from Telegram `startapp` is sent to Supabase as a scoped request header.
- Package versions are pinned to explicit semver ranges instead of `latest`.
- Event cards now show clearer activity, date, time, location, participants, price, organizer RLI placeholder, and direct join/request action.

### Known Gaps

- Telegram `initData` validation still needs a production backend or secure edge function.
