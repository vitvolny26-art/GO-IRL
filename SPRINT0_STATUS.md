# Sprint 0 Status

Status: **Complete**

Date: 2026-07-03

## Passed

- Git working tree is clean and `main` is synced with `origin/main`.
- Local quality gate passes:
  - `pnpm run test`
  - `pnpm run lint`
  - `pnpm run build`
- GitHub Actions CI completed successfully on `main`.
- Netlify production URL responds with HTTP 200 and serves the GO IRL page.
- Supabase REST is reachable with the publishable key.
- Required production columns such as `location_url`, `display_name`, and `status` are available through REST.
- Production RLS hides unrelated private activities from guest REST requests.
- Production RLS allows the exact invited private activity when the request includes the Telegram `startapp` invite activity id.

## Resolved Blocker

Supabase production RLS was not aligned with `supabase/schema.sql`.

The latest `supabase/schema.sql` has now been applied in production and re-tested. Private activities are only visible to:

- the organizer;
- existing participants;
- users opening the activity through a valid Telegram `startapp` invite parameter.

## Remaining Manual Smoke Test

Before a wider release, run this user-facing Telegram check with two accounts:

1. Account A creates a private activity.
2. Account B does not see it in the normal list.
3. Account A shares the activity link.
4. Account B opens the link and sends a join request.
5. Account A approves or rejects the request.
