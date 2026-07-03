# Sprint Plan

GO IRL is developed as a platform, not as a one-off Telegram Mini App. Every sprint should move the product closer to real offline meetings while keeping future Web, Android, and iOS clients in mind.

## Sprint 0 - Foundation

Goal: make the project safe to develop and release.

- GitHub repository connected.
- Build and TypeScript checks pass.
- Lint and tests are configured.
- CI runs test, lint, and build.
- Supabase schema and RLS are documented.
- Deployment checklist exists.
- No secrets are committed.

Remaining:

- Apply the latest `supabase/schema.sql` in production Supabase.
- Confirm first GitHub Actions CI run passes on `main`.
- Run Telegram Mini App smoke-test with two accounts.

## Sprint 1 - MVP Core

Goal: make the main user journey feel clear, fast, and useful.

- Premium event cards that answer what, when, where, who, price, and join status.
- Redesigned home screen around discovery and categories.
- Activity creation in under 30 seconds.
- Join/request flow in under 15 seconds.
- Organizer edit and private request review.
- Strong empty, loading, success, and error states.

## Sprint 2 - Telegram And Notifications

Goal: make the app feel native inside Telegram.

- BotFather menu button and Mini App URL verified.
- Telegram `startapp` share links verified.
- n8n or backend-triggered Telegram notifications.
- Organizer notification for private join requests.
- Participant notification for approve/reject decisions.
- Activity reminders before start time.

## Sprint 3 - Trust, Verification, RLI

Goal: start building the platform's unique trust layer.

- Attendance confirmation.
- Organizer participant verification.
- Participant-to-participant verification.
- RLI history and basic profile reputation.
- Achievements tied to real participation.

## Sprint 4 - Modules And Discovery

Goal: evolve from a generic event list into a modular platform.

- Sport as the first strong module.
- Module-specific cards, filters, and creation fields.
- Activities, Nature, Parties, Creative, and Learning prepared as independent modules.
- City expansion through configuration.

## Sprint 5 - Production Growth

Goal: prepare for broader public usage.

- Analytics for activation, joins, shares, and completed activities.
- Reporting and moderation.
- Abuse protection.
- Referral loop.
- Web parity with Telegram Mini App behavior.
