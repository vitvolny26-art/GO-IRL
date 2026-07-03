# Roadmap

GO IRL is being built as a platform, not a one-off Telegram Mini App. New work should stay compatible with future web, Android, and iOS clients.

## Phase 1 - Production Foundation

- Keep build and TypeScript checks green.
- Add linting with the smallest dependency set that matches the project.
- Add focused automated tests for activity creation, join flows, and private request review.
- Harden Supabase RLS and document every policy.
- Add Telegram `initData` validation on a trusted backend or edge function.
- Keep Telegram Mini App lifecycle explicit: no surprise close, no background polling, user-triggered close only.

## Phase 2 - Product Quality

- Redesign event cards for faster scanning and a more premium 2026 feel.
- Redesign the home screen around discovery actions and large categories.
- Add clearer organizer controls for editing, sharing, and reviewing requests.
- Improve empty, loading, and error states.
- Add city expansion for Prague, Brno, Ostrava, and future cities through configuration.

## Phase 3 - Growth

- Add server-side notifications for join requests and event updates through n8n.
- Add user reputation/RLI details.
- Add event moderation and abuse reporting.
- Add analytics for activation, joins, shares, and completed offline events.
- Prepare web deployment parity with Telegram Mini App behavior.
