# Security Architecture

This document captures security tasks for future implementation. It is a plan, not a complete implementation.

## Supabase RLS

Every user-facing table must have RLS enabled.

Rules:

- Users read/update their own private rows.
- Public events are readable by all.
- Private/invite events require organizer, participant, invite token, or approved access.
- Service role is used only by backend/n8n.
- Event deletion is allowed only for the organizer or a server-side admin allowlist entry.

## Least Privilege API

- Frontend uses only anon/publishable key.
- Service role key never ships to browser.
- n8n stores service credentials outside Git.
- Sprint 1 admin UI uses `VITE_GO_IRL_ADMIN_KEYS` only to reveal owner controls.
- Supabase also requires the same trusted `user_key` in `public.admin_users` for delete permission.
- This is temporary: production admin must not rely only on client-side env/localStorage.
- Admin moderation uses separate permissions later.

## Sensitive Data Separation

Separate:

- auth identity
- public profile
- private profile/preferences
- notification delivery identifiers
- AI logs
- audit logs

## Token and Session Strategy

Future:

- validate Telegram initData on trusted backend
- short-lived app session token
- logout/session revocation
- refresh strategy outside Mini App localStorage

## Rate Limiting and Abuse Protection

Planned limits:

- event creation
- join requests
- reports
- messages when chat exists
- source/admin actions

## Sprint 1 Admin Role

Current roles:

- `user`
- `organizer`
- `admin`

Organizer status comes from the event `organizer_key`. Admin status is a temporary allowlist:

- frontend: `VITE_GO_IRL_ADMIN_KEYS=telegram:<numeric_id>,telegram_username:<username>`
- database: `public.admin_users.user_key`

The frontend allowlist only controls visibility of admin UI. Real delete permission must be enforced by Supabase RLS through `public.admin_users`. This model must be replaced by trusted Telegram `initData` validation plus server-issued claims before public release.

## Reporting and Blocking

Planned:

- report user
- block user
- block prevents profile visibility and messages
- moderation queue for abuse

## Secrets

- no service keys in frontend
- no bot token in repository
- no OpenAI/n8n secrets in repository
- rotate exposed Telegram bot tokens immediately

## Audit Logs

Log:

- reports
- blocks
- privacy setting changes
- suspicious actions
- admin moderation actions

Do not log excessive personal data.
