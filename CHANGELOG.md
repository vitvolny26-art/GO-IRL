# Changelog

All notable confirmed changes to GO IRL are tracked here.

## 0.1.0 - 2026-07-03

### Added

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

### Changed

- Documentation now reflects the Supabase-backed runtime instead of local-only storage.

### Known Gaps

- Telegram `initData` validation still needs a production backend or secure edge function.
