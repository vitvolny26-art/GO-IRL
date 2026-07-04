# Security Architecture

This document captures implemented security foundations and remaining tasks. It is not a claim of full production security until trusted Telegram identity validation is live.

## Supabase RLS

Every user-facing table must have RLS enabled.

Rules:

- Users read/update their own private rows.
- Public events are readable by all.
- Private/invite events require organizer, participant, invite token, or approved access.
- Service role is used only by backend/n8n.
- Event deletion is allowed only for the organizer or an admin role.
- Moderator/admin review access is separated from regular user access.

## Least Privilege API

- Frontend uses only anon/publishable key.
- Service role key never ships to browser.
- n8n stores service credentials outside Git.
- Sprint 1 admin UI uses `VITE_GO_IRL_ADMIN_KEYS` only to reveal owner controls.
- Supabase also requires a trusted database role entry for elevated permissions.
- `public.user_roles` is the forward-compatible role table after `migration_v2_backend_foundation.sql`.
- `public.admin_users` remains only as backward compatibility and migration seed input.
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

## Backend Roles

Current roles:

- `user`
- `organizer`
- `moderator`
- `admin`

Organizer status comes from the event `organizer_key`. Database role status comes from `public.user_roles`:

- `user`: normal participant.
- `organizer`: reserved explicit role for future organizer capabilities; current ownership still comes from `activities.organizer_key`.
- `moderator`: can review and moderate scoped records.
- `admin`: can manage high-risk platform actions.

The legacy Sprint 1 allowlist still exists for UI visibility and migration compatibility:

- frontend: `VITE_GO_IRL_ADMIN_KEYS=telegram:<numeric_id>,telegram_username:<username>`
- database compatibility table: `public.admin_users.user_key`

The frontend allowlist only controls visibility of admin UI. Real delete/moderation permission must be enforced by Supabase RLS through `public.user_roles`. This model must still be paired with trusted Telegram `initData` validation plus server-issued claims before public release.

## Reporting and Blocking

Planned:

- report user
- block user
- block prevents profile visibility and messages
- moderation queue for abuse

## Optional Activity Chat Security

Activity Chat is optional and temporary. It is a coordination tool for a real-life Activity, not a permanent messenger.

Access rules:

- Organizer can access chat for their Activity.
- Confirmed participants can access chat.
- Admin/moderator can access chat through separate moderation permissions.
- Guests cannot access chat.
- Pending users cannot access chat.
- Rejected users cannot access chat.
- Blocked users cannot access chat with the blocker where the product model allows separation.

RLS approach:

- `activity_chats` has RLS enabled.
- `activity_chat_members` has RLS enabled.
- `activity_chat_messages` has RLS enabled.
- User can read a chat only when they are an active chat member or have admin/moderator permission.
- User can read messages only for visible, non-archived chats where they are a member.
- Pending Activity membership is not enough for chat membership.
- Service role/n8n can archive chats through a controlled cleanup workflow.

Moderation:

- Every message can be reported.
- Reported chats can receive moderation hold.
- n8n cleanup must not archive/delete chats with active moderation hold.
- Audit logs should record moderation actions without excessive personal data.

Retention:

- Default MVP behavior is archive 24 hours after Activity end.
- Archived messages are hidden from UI.
- Hard delete requires privacy review.
- Chat contents must not be sent to AI APIs without explicit consent.

## Secrets

- no service keys in frontend
- no bot token in repository
- no OpenAI/n8n secrets in repository
- rotate exposed Telegram bot tokens immediately

## Audit Logs

Log:

- activity create/update/delete
- activity membership create/update/delete
- reports
- blocks
- privacy setting changes
- suspicious actions
- admin moderation actions

Do not log excessive personal data.

`supabase/migration_v2_backend_foundation.sql` creates `public.audit_log` and database triggers for `activities` and `activity_members`. The metadata is intentionally minimal: activity id, visibility, city, activity type, member key, and member status.
