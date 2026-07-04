# Supabase RLS Design

RLS is the core database safety layer for GO IRL. Frontend checks improve UX, but database policies must enforce real access.

## Principles

- RLS on every user-facing table.
- Frontend uses anon/publishable key only.
- Service role stays on backend/n8n.
- Users read/write only their own private data.
- Public Activities are readable by all.
- Private/invite Activities require organizer, confirmed participant, invite access, or admin/moderator permission.

## Table Policy Matrix

| Table | Public read | Owner read/write | Organizer | Admin/moderator | Service role |
| --- | --- | --- | --- | --- | --- |
| `users` | no | own row | no | limited | yes |
| `user_profiles` | public fields only | full own profile | no | limited | yes |
| `interests` | yes | no | no | write | yes |
| `user_interests` | no | own rows | no | limited | yes |
| `events` | public published | own organized events | own events | moderate | yes |
| `activity_members` | scoped | own membership | own Activity members | moderate | yes |
| `activity_chats` | no | member only | own Activity chat | moderate | yes |
| `activity_chat_messages` | no | member only | own Activity chat | moderate | yes |
| `notification_preferences` | no | own row | no | no raw delivery secrets | yes |
| `discovered_events` | no | no | no | review | yes |
| `admin_users` | no | no | no | admin only | yes |

## Activity Chat RLS

- Active chat members can read active chat.
- Pending users are not chat members.
- Rejected users are not chat members.
- Blocked users are excluded according to block model.
- Archived messages are hidden from normal UI.
- n8n/service role can archive eligible chats.

## Admin Enforcement

Temporary frontend allowlists are not enough for production. Real admin permissions must come from:

- trusted Telegram `initData` validation
- backend-issued claims
- Supabase Auth claims
- `admin_users` / role tables protected by RLS

## Verification

Every schema migration must include:

- positive owner read/write checks
- negative unrelated-user checks
- private/invite visibility checks
- admin/moderator checks
- service-role workflow checks
