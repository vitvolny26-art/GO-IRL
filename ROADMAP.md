# Roadmap

GO IRL is being built as a platform, not a one-off Telegram Mini App. New work should stay compatible with future web, Android, and iOS clients.

## Phase 1 - Production Foundation

- Keep build and TypeScript checks green.
- Add linting with the smallest dependency set that matches the project.
- Add focused automated tests for activity creation, join flows, and private request review.
- Harden Supabase RLS and document every policy.
- Add Telegram `initData` validation on a trusted backend or edge function.
- Keep Telegram Mini App lifecycle explicit: no surprise close, no background polling, user-triggered close only.
- Privacy settings placeholder.
- No background tracking policy.
- User notification opt-in design.

## Phase 2 - Product Quality

- Redesign event cards for faster scanning and a more premium 2026 feel.
- Redesign the home screen around discovery actions and large categories.
- Add Discover / For You screen with search, quick filters, and simple matching by city, interests, date, and free spots.
- Add favorite activity selection to the user profile.
- Add clearer organizer controls for editing, sharing, and reviewing requests.
- Improve empty, loading, and error states.
- Add city expansion for Prague, Brno, Ostrava, and future cities through configuration.
- Real Supabase database model for users, profiles, interests, and events.
- User interests.
- Notification preferences.
- Supabase RLS hardening.
- User privacy settings.
- Delete account flow.

## Phase 3 - Growth

- Add server-side notifications for join requests and event updates through n8n.
- Add user reputation/RLI details.
- Add event moderation and abuse reporting.
- Add analytics for activation, joins, shares, and completed offline events.
- Prepare web deployment parity with Telegram Mini App behavior.
- n8n event discovery workflow.
- AI event normalization.
- AI duplicate detection.
- AI event discovery sources: public event websites, Facebook Events, Meetup, Eventbrite, city calendars, universities, Telegram, Discord, Reddit, and public calendars.
- Facebook Groups are future-only through official API/manual review; no personal-account scraping or stored Facebook credentials.
- MVP discovery uses public sources, RSS/API, public Telegram channels, manual moderation, and user suggestions.
- Anonymous mode.
- Reveal contact by mutual consent.
- Reporting and blocking.
- Rate limiting.

## Phase 4 - Discovery and Digest

- Evening personalized digest.
- Digest matching respects user city, interests, language, price limits, quiet hours, and working hours.
- n8n sends personalized digest through the selected notification channel and prevents duplicate event sends.
- Digest excludes unreviewed, expired, completed, cancelled, and duplicate events.
- Telegram notification bot.
- Source management admin panel.
- Anonymous chat.
- Auto-expiring chats.
- Admin moderation.
- Audit logs.

## Phase 5 - Privacy and Security Hardening

- GDPR-style export/delete.
- Security review.
- Privacy review.
- Abuse prevention hardening.

## Maximum Privacy + User Data Security

- Data minimization: store only data needed for events, interests, safety, and notifications.
- Privacy by default: public profile surfaces reveal minimal data.
- User control: edit profile, opt out of notifications, delete account, delete history, export data.
- No background tracking: Mini App never tracks users in the background.
- Server-side notifications: n8n/backend handles notifications and digest delivery.
- Anonymous mode: allow pseudonyms and avoid exposing Telegram username without consent.
- Mutual reveal: contacts are shown only after both sides consent.
- Masked profiles: hide Telegram ID, phone, email, exact address, and internal IDs.
- Event privacy: private and invite-only events can hide location/details until approved.
- AI privacy: AI uses public external event data and anonymized interests only.
