# Sprint 0 Status

Status: **Production Verification Blocked**

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

## Blocker

Supabase production RLS is not yet aligned with `supabase/schema.sql`.

A guest REST request can still read at least one `private` activity. Private activities must only be visible to:

- the organizer;
- existing participants;
- users opening the activity through a valid Telegram `startapp` invite parameter.

## Required Action

Apply the latest `supabase/schema.sql` in the production Supabase SQL Editor.

After applying it, re-run the Sprint 0 smoke test:

1. Query activities as an unrelated guest user.
2. Confirm no unrelated `private` activities are returned.
3. Open a shared Telegram `startapp` link.
4. Confirm that exact invited private activity opens.
5. Confirm a second account can send a join request.
6. Confirm the organizer can approve or reject the request.

Sprint 0 can be marked complete only after this blocker is resolved.
