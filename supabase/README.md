# GO IRL Supabase Setup

This folder contains the database setup for the GO IRL Telegram Mini App.

## 1. Create a Supabase Project

1. Open Supabase Dashboard.
2. Create a new project.
3. Save the project URL and publishable anon key.
4. Open SQL Editor.

## 2. Apply the Base Schema

In SQL Editor, paste and run:

```sql
-- supabase/schema.sql
```

Use the full contents of `supabase/schema.sql`.

This creates:

- `public.activities`
- `public.activity_members`
- RLS helper functions
- RLS policies
- indexes
- realtime publication entries

## 3. Apply Migration v1

After the base schema, paste and run:

```sql
-- supabase/migration_v1.sql
```

Use the full contents of `supabase/migration_v1.sql`.

This migration is safe to run again. It adds or fixes:

- `activities.updated_at`
- `admin_users` allowlist for temporary Sprint 1 admin permissions
- price limit check: `0..100000`
- existing out-of-range test prices normalized into `0..100000`
- member status check with `pending`
- indexes for organizer, visibility/date, and user status lookups
- `updated_at` trigger
- invite join policy alignment: `invite` creates `pending`, `public` creates `joined`
- organizer/admin delete policy for activities

## 4. RLS

RLS is enabled by the SQL files:

```sql
alter table public.activities enable row level security;
alter table public.activity_members enable row level security;
```

Do not disable RLS in production.

The app sends these headers from `src/supabase.ts`:

- `x-go-irl-user-key`
- `x-go-irl-invite-activity`

Policies use those headers to separate each Telegram user and support invite links.

Admin delete permissions are checked by `public.admin_users` through `go_irl_request_is_admin()`. Add only trusted owner keys:

```sql
insert into public.admin_users (user_key, note)
values ('telegram:123456789', 'project owner')
on conflict (user_key) do update set note = excluded.note;
```

For Sprint 1 the frontend also needs the same key in `VITE_GO_IRL_ADMIN_KEYS` so it can show admin-only UI. This is temporary. Production admin enforcement must move to trusted Telegram `initData` validation, Supabase Auth claims, or backend/RLS rules that cannot be spoofed from the browser.

## 5. Environment Variables

Local `.env.local`:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_TELEGRAM_BOT_USERNAME=GOirl_bot
VITE_GO_IRL_ADMIN_KEYS=telegram:123456789,telegram_username:yourusername
```

Vercel project environment variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_TELEGRAM_BOT_USERNAME
VITE_GO_IRL_ADMIN_KEYS
```

Set them for Production, Preview, and Development if you use Vercel previews.

## 6. Connect to Vercel

1. Open Vercel project settings.
2. Go to Environment Variables.
3. Add the variables above.
4. Redeploy the latest `main` deployment.

## 7. Verify Database Works

1. Open the deployed Mini App.
2. Create a public event.
3. Open the app from another Telegram account.
4. Confirm the public event is visible.
5. Create an invite-only event.
6. Join from another account and confirm the request appears as `pending`.
7. Approve the request from the organizer account.
8. Confirm participant count updates.

If the app shows a database error, check:

- Vercel env variables are present.
- Supabase URL and publishable key are correct.
- RLS policies were applied.
- SQL migration completed without errors.
