# Backlog

Confirmed work is ordered by priority.

## Build Blocker

- None confirmed. `pnpm run build` passes as of 2026-07-03.

## Typecheck Blocker

- None confirmed. `tsc -b` passes through `pnpm run build` as of 2026-07-03.

## Lint Blocker

- None confirmed. `pnpm run lint` passes as of 2026-07-03.

## Test Blocker

- None confirmed. `pnpm run test` passes as of 2026-07-03.
- Add deeper tests for activity creation, join/leave, waiting list, private pending requests, organizer approvals, and edit permissions.

## Runtime Bug

- Verify deployed Netlify environment variables match `.env.example`.
- Verify Supabase realtime is enabled for `activities` and `activity_members` in production.
- Verify Telegram `startapp` links open the exact shared activity from a second account.

## Security Issue

- Telegram `initData` is not validated by a trusted backend yet.
- Review the latest Supabase RLS policies in the production dashboard after applying `supabase/schema.sql`.

## Technical Debt

- Root app and `apps/telegram-miniapp` configuration should be consolidated or documented as an intentional monorepo direction.
- Replace temporary organizer RLI placeholder in event cards with real RLI data after the profile/reputation model is implemented.
