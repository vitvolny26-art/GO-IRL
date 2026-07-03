# Deployment

This checklist is for releasing the GO IRL Telegram Mini App to production.

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
2. Apply the latest `supabase/schema.sql` in SQL Editor.
3. Confirm `activities` and `activity_members` exist.
4. Confirm realtime is enabled for both tables.
5. Confirm RLS is enabled for both tables.

Required frontend environment variables:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_TELEGRAM_BOT_USERNAME=GOirl_bot
```

Use only the publishable/anon key in frontend hosting. Never put a service role key in Netlify or client code.

## 3. Netlify

1. Set the environment variables from `.env.example`.
2. Build command: `pnpm run build`.
3. Publish directory: `dist`.
4. Connect the site to the GitHub repository `vitvolny26-art/GO-IRL`.
5. Deploy from the `main` branch.
6. Open the production URL and verify the app renders.

The repository includes `netlify.toml`, so Netlify should detect:

```text
Build command: pnpm run build
Publish directory: dist
Node: 24
pnpm: 11.7.0
```

After the GitHub connection is active, every push to `main` should trigger a production deploy automatically.

## 3a. Vercel Fallback Hosting

Use Vercel if Netlify production deploys are unavailable.

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
```

The repository includes `vercel.json`, so Vercel should pick up the correct settings automatically.

## 4. Telegram BotFather

1. Open `@BotFather`.
2. Select the GO IRL bot.
3. Configure the Mini App web app URL to the production Netlify URL.
4. Configure the menu button title.
5. Restart the Mini App in Telegram after changing the URL.

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

## 6. Release Notes

Update `RELEASE_NOTES.md` before announcing the release.
