# n8n Workflow Architecture

This document defines future n8n workflow responsibilities. It does not include runnable workflow JSON yet.

## Workflow 1: Event Discovery

Schedule: three times per day.

Steps:

1. Read active rows from `external_sources`.
2. Fetch public source pages/posts.
3. Extract candidate event text and URLs.
4. Send public candidate data to AI normalization.
5. Save AI decisions in `ai_event_review_log`.
6. Save normalized candidates in `discovered_events`.
7. Mark duplicates.
8. Optionally promote high-confidence candidates to `events` later.

Credentials:

- Service role Supabase key in n8n only.
- Source API credentials in n8n only.
- AI API key in n8n only.

## Workflow 2: Evening Digest

Schedule: evening, per target city/timezone.

Steps:

1. Read `notification_preferences` where digest is enabled.
2. Skip users in quiet hours.
3. Read interests and matching events.
4. Exclude already sent events from `notification_digest_log`.
5. Build localized digest.
6. Send via Telegram/email/later channels.
7. Write delivery status to `notification_digest_log`.

## Workflow 3: Source Health

Schedule: daily.

Steps:

1. Check source fetch success/failure.
2. Update `external_sources.last_checked_at`.
3. Flag broken sources for admin review.

## Operational Rules

- Mini App does not poll for notifications.
- Service role key never ships to frontend.
- AI receives public event data only.
- Personal identifiers stay out of AI prompts.
- n8n logs must avoid raw private user data.

## Future Workflow JSON

Workflow JSON should be committed only after:

- Supabase tables are live.
- secrets are configured outside Git.
- a test n8n instance exists.
- manual dry-run has been completed.
