# Backlog

Confirmed work is ordered by priority.

## Build Blocker

- None confirmed. `pnpm run build` passes as of 2026-07-03.

## Typecheck Blocker

- None confirmed. `tsc -b` passes through `pnpm run build` as of 2026-07-03.

## Lint Blocker

- No lint command exists in `package.json`.
- Add ESLint only after choosing a minimal config compatible with the current React/Vite/TypeScript stack.

## Test Blocker

- No automated test command exists in `package.json`.
- Add focused tests for activity creation, join/leave, waiting list, private pending requests, organizer approvals, and edit permissions.

## Runtime Bug

- Verify deployed Netlify environment variables match `.env.example`.
- Verify Supabase realtime is enabled for `activities` and `activity_members` in production.
- Verify Telegram `startapp` links open the exact shared activity from a second account.

## Security Issue

- Telegram `initData` is not validated by a trusted backend yet.
- Review Supabase RLS policies before public launch.

## Technical Debt

- Root app and `apps/telegram-miniapp` configuration should be consolidated or documented as an intentional monorepo direction.
- Production deployment flow should be documented with Netlify and BotFather steps.
- Add release checklist for schema migration, environment variables, and Telegram Mini App restart testing.
