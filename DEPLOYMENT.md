# Deployment

Status: **current deployment checklist / needs live verification before public release**.

This checklist is for releasing the GO IRL Telegram Mini App to production.

Current hosting target: **Vercel**.

Netlify references are preserved only as historical/secondary hosting notes.

## 1. Build Locally

```powershell
pnpm install
pnpm run test
pnpm run lint
pnpm run build
```

Do not deploy if any command fails.

## 2. Supabase

1. Open the production Supabase project.
2. Apply only approved migrations for the current release scope.
3. Confirm `activities` and `activity_members` exist.
4. Confirm realtime is enabled for both tables.
5. Confirm RLS is enabled for both tables.
6. Confirm trusted-auth migration status before public release.

Required frontend environment variables:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_TELEGRAM_BOT_USERNAME=GOirl_bot
VITE_GO_IRL_LEGACY_DEMO_AUTH=false
```

Use only the publishable/anon key in frontend hosting. Never put a service role key in Vercel, Netlify, or client code.

## 3. Vercel

1. Import the GitHub repository `vitvolny26-art/GO-IRL`.
2. Framework preset: `Vite`.
3. Build command: `pnpm run build`.
4. Install command: `pnpm install --frozen-lockfile`.
5. Output directory: `dist`.
6. Add environment variables:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_TELEGRAM_BOT_USERNAME=GOirl_bot
VITE_GO_IRL_LEGACY_DEMO_AUTH=false
```

The repository includes `vercel.json`, so Vercel should pick up the SPA fallback settings automatically.

After the GitHub connection is active, every push to `main` should trigger a production deploy automatically.

## 3a. Historical / Secondary Netlify Notes

Netlify was used earlier in the project and can remain as a fallback only if explicitly selected again.

Historical Netlify settings:

```text
Build command: pnpm run build
Publish directory: dist
Node: 24
pnpm: 11.7.0
```

Do not configure BotFather to a stale Netlify URL if the current production Mini App runs on Vercel.

## 4. Telegram BotFather

1. Open `@BotFather`.
2. Select the GO IRL bot.
3. Configure the Mini App web app URL to the current production Vercel URL.
4. Configure the menu button title.
5. Restart the Mini App in Telegram after changing the URL.
6. Validate Telegram `startapp` share links through `@GOirl_bot`.

## 5. Smoke Test

Use at least two Telegram accounts.

1. Account A creates a public activity.
2. Account B sees the activity without refreshing too long.
3. Account B joins the public activity.
4. Account A creates a private activity.
5. Account B does not see the private activity from the main list.
6. Account A shares the private activity link.
7. Account B opens the shared link and sends a join request.
8. Account A approves or rejects the request.
9. Account A edits an activity and Account B sees the update.
10. Confirm `/join/:id` opens the target activity in browser fallback.
11. Confirm Telegram Mini App `startapp` opens the target activity.
12. Confirm explicit Done / Back to Telegram behavior on real Telegram clients.

## 6. Trusted Auth Release Gate

Do not launch publicly until all are true:

- `verifyTelegramInitData` Edge Function is deployed;
- required Edge Function secrets are configured;
- `supabase/migration_v4_trusted_telegram_auth.sql` is applied;
- `supabase/verify_trusted_auth.sql` passes;
- create/join/edit/delete smoke tests pass with real Telegram accounts;
- production no longer relies on forged `x-go-irl-user-key` identity.

## 7. Release Notes

Update `RELEASE_NOTES.md` before announcing the release.
