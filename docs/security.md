# Security Architecture

This document captures security tasks for future implementation. It is a plan, not a complete implementation.

## Supabase RLS

Every user-facing table must have RLS enabled.

Rules:

- Users read/update their own private rows.
- Public events are readable by all.
- Private/invite events require organizer, participant, invite token, or approved access.
- Service role is used only by backend/n8n.

## Least Privilege API

- Frontend uses only anon/publishable key.
- Service role key never ships to browser.
- n8n stores service credentials outside Git.
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
