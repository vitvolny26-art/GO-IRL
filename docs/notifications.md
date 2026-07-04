# Notifications and Evening Digest

GO IRL notifications must be server-side. The Telegram Mini App must not stay alive in the background for notifications.

## User Preferences

Preferences live in `notification_preferences`:

- city
- language
- interests
- preferred days
- preferred time window
- maximum price
- radius or district
- evening digest opt-in
- quiet hours
- notification channel:
  - Telegram
  - email
  - later: Viber
  - later: WhatsApp

Quiet hours should be enabled by default when notification preferences are created.

## Evening Digest Pipeline

1. n8n runs in the evening.
2. Select users with `evening_digest_enabled = true`.
3. Respect quiet hours.
4. Load user city, language, interests, price limit, preferred days/time.
5. Select matching `events`.
6. Exclude events already sent using `notification_digest_log`.
7. Rank events by relevance and freshness.
8. Render a short digest in the user's language.
9. Send through the selected channel.
10. Save result in `notification_digest_log`.

## Duplicate Send Prevention

Use:

- `notification_digest_log.user_id`
- `digest_date`
- `channel`
- `event_ids`

Do not send the same event repeatedly to the same user in the same digest window.

## Privacy Rules

- Digest is opt-in.
- Digest must not expose private user data.
- Delivery logs should be retained for a limited period.
- Disable all notifications with one preference update.
- No sensitive event participant data in notification content.

## Not Implemented Now

- real Telegram bot sends
- email delivery
- Viber/WhatsApp delivery
- push notifications
- real digest ranking model
