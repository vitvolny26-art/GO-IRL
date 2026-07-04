# Admin Architecture

Admin tools exist to protect local communities and keep activities healthy. They must be built after backend roles and RLS are stable.

## Roles

- `user`: regular participant.
- `organizer`: creator/owner of an Activity.
- `moderator`: reviews reports, unsafe events, and chat moderation holds.
- `admin`: manages platform configuration and high-risk actions.

Current Sprint 1 admin visibility uses a temporary allowlist. Production admin enforcement must move to trusted backend/RLS claims.

## Admin Capabilities

Future admin surfaces:

- categories
- cities
- activity types
- users
- activities
- reports
- source management
- notification/digest health
- analytics
- RLI review
- moderation queue

## Permissions

Admin permissions must be least-privilege:

- category/city management requires admin.
- report review requires moderator or admin.
- user bans require admin or elevated moderator.
- event deletion requires organizer or admin.
- source management requires admin.
- analytics access must avoid raw private data.

## Safety Rules

- Admin actions must be logged.
- Admin UI must not rely only on frontend checks.
- Service-role operations stay on backend/n8n only.
- Admin panel must not expose unnecessary personal data.

## Not Implemented Now

- no admin runtime UI
- no new admin API
- no moderation dashboard
- no analytics dashboard
