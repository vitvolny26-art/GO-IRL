# Backlog

Confirmed work is ordered by priority.

## Build Blocker

- None confirmed. `pnpm run build` passes as of 2026-07-03.

## Typecheck Blocker

- None confirmed. `tsc -b` passes through `pnpm run build` as of 2026-07-03.

## Lint Blocker

- None confirmed. `pnpm run lint` passes as of 2026-07-03.

## Test Blocker

- None confirmed. `pnpm run test` passes as of 2026-07-03.
- Add deeper tests for activity creation, join/leave, waiting list, private pending requests, organizer approvals, and edit permissions.

## Runtime Bug

- Verify deployed Vercel environment variables match `.env.example`.
- Verify Supabase realtime is enabled for `activities` and `activity_members` in production.
- Verify Telegram `startapp` links open the exact shared activity from a second account.
- Verify `Telegram.WebApp.close()` behavior on iOS, Android, and Telegram Desktop.

## Security Issue

- Telegram `initData` is not validated by a trusted backend yet.
- Review the latest Supabase RLS policies in the production dashboard after applying `supabase/schema.sql`.
- Replace Sprint 1 admin allowlist with server-side enforcement backed by trusted Telegram `initData`, Supabase Auth claims, or backend-issued roles.

## Technical Debt

- Root app and `apps/telegram-miniapp` configuration should be consolidated or documented as an intentional monorepo direction.
- Replace temporary organizer RLI placeholder in event cards with real RLI data after the profile/reputation model is implemented.
- Add deeper empty-state actions on the home screen when there are no upcoming events.
- Add server-side n8n notifications for requests and event updates; do not keep the Mini App running in background for notifications.

## Sprint 2 - Database and Preferences

- VERT-006 Sport vertical MVP.
- VERT-007 Sport skill matching.
- VERT-003 Vertical-specific create forms.
- Real Supabase database.
- User interests.
- Favorite activity persistence in Supabase.
- Notification preferences.
- User privacy settings.
- Delete account flow.
- Supabase RLS hardening.

## Sprint 3 - AI Event Discovery

- VERT-015 Friends vertical.
- Replace `SimpleRecommendationEngine` with an AI-backed implementation behind the existing `RecommendationEngine` interface.
- n8n event discovery workflow.
- Discovery source coverage: public event websites, Facebook Events, Meetup, Eventbrite, city sites, universities, Telegram, Discord, Reddit, and public calendars.
- MVP discovery source policy: public sources, RSS/API, public Telegram channels, manual moderation, and user suggestions first.
- Facebook Groups future integration only through official API or manual review; no personal account automation.
- AI event normalization.
- AI duplicate detection.
- Event lifecycle job for `published` -> `expired` / `completed`.
- Anonymous mode.
- Reveal contact by mutual consent.
- Reporting / blocking.
- Rate limiting.

## Sprint 4 - Evening Digest and Admin

- VERT-008 Dating vertical architecture.
- VERT-009 Dating profile.
- VERT-010 Like/pass flow.
- VERT-011 Mutual match.
- VERT-012 Anonymous dating chat.
- VERT-013 Mutual identity reveal.
- VERT-014 Dating safety: report/block.
- Evening personalized digest.
- Respect quiet hours and working hours; never send AI/n8n digest at night.
- Store discovered events in the database before digest selection.
- Telegram notification bot.
- Source management admin panel.
- Anonymous chat.
- Auto-expiring chats.
- Admin moderation.
- Audit logs.
- Server-side admin role enforcement for event deletion and moderation.

## Maximum Privacy + User Data Security

- PRIV-001 Data minimization policy.
- PRIV-002 Anonymous profile mode.
- PRIV-003 Mutual contact reveal.
- PRIV-004 Delete account.
- PRIV-005 Export user data.
- PRIV-006 Notification opt-in.
- PRIV-007 Quiet hours.
- PRIV-008 Supabase RLS hardening.
- PRIV-009 Public/private profile separation.
- PRIV-010 Anonymous chat.
- PRIV-011 Chat auto-delete.
- PRIV-012 Report user.
- PRIV-013 Block user.
- PRIV-014 Admin moderation.
- PRIV-015 AI privacy guardrails.
- PRIV-016 n8n notification privacy.
- SEC-001 Rate limiting.
- SEC-002 Abuse protection.
- SEC-003 Audit logs.
- SEC-004 Token/session hardening.
- SEC-005 Secrets management.

## Database + AI Discovery + Evening Digest

- DB-001 Add `users` and `user_profiles`.
- DB-002 Add `interests`, `event_categories`, and `user_interests`.
- DB-003 Add canonical `events` table.
- DB-004 Add external source tracking.
- DB-005 Add `discovered_events` and source linkage.
- AI-001 Build n8n discovery schedule, 3 runs per day.
- AI-002 Add AI normalization prompt and parser.
- AI-003 Add confidence scoring and rejection rules.
- AI-004 Add duplicate detection.
- DIGEST-001 Add digest preference UI.
- DIGEST-002 Build evening digest selection.
- DIGEST-003 Add `notification_digest_log` duplicate-send guard.
- DIGEST-004 Add Telegram delivery through server/n8n.
- SRC-001 Add `external_sources` source policy fields and health checks.
- SRC-002 Add user-submitted event suggestions.
- SRC-003 Add manual moderation queue for `pending_review`.
- SRC-004 Document and enforce no Facebook credential storage.

## Vertical Experiences

- VERT-001 Vertical Experience Architecture.
- VERT-002 ActivityRendererRegistry.
- VERT-003 Vertical-specific create forms.
- VERT-004 Vertical-specific details screens.
- VERT-005 Vertical-specific filters.
- VERT-006 Sport vertical MVP.
- VERT-007 Sport skill matching.
- VERT-008 Dating vertical architecture.
- VERT-009 Dating profile.
- VERT-010 Like/pass flow.
- VERT-011 Mutual match.
- VERT-012 Anonymous dating chat.
- VERT-013 Mutual identity reveal.
- VERT-014 Dating safety: report/block.
- VERT-015 Friends vertical.
- VERT-016 Food vertical.
- VERT-017 AI recommendations per vertical.
