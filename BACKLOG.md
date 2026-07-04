# Backlog

Confirmed work is ordered by priority.

All major product and architecture decisions must follow [docs/GO_IRL_CONSTITUTION.md](docs/GO_IRL_CONSTITUTION.md).

## Strategic Priority Order

1. Infrastructure Hardening
   - Supabase production readiness.
   - Migrations.
   - RLS.
   - Roles.
   - Database verification.
   - Remove dependency on local fallback where possible after production migration is verified.
2. Performance
   - Lazy loading.
   - Code splitting.
   - Bundle optimization.
   - Telegram Mini App startup performance.
3. n8n Notifications
   - Server-side notification workflow.
   - Evening digest.
   - Working hours.
   - Quiet hours.
   - No Mini App background work.
4. AI Event Discovery
   - External sources.
   - Event collection.
   - AI normalization.
   - Duplicate detection.
   - Confidence scoring.
   - Save discovered events to the database.
5. Friends Vertical
   - Deferred until database and notification foundation is stable.
6. Travel Vertical
   - Deferred until Friends and source discovery architecture are stable.
7. Dating Vertical
   - Deferred until privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection are ready.

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

- Production `supabase/migration_v1.sql` was applied and verified on 2026-07-04; `city_id`, `metadata`, `participant_note`, and `activity_type` are now stored in Supabase as the source of truth.
- Keep local event-field fallback only as backward compatibility for older/preview databases.
- Remove local fallback for `city_id`, `metadata`, `participant_note`, and `activity_type` after a stable production period.
- No confirmed unfinished-code markers remain in `src/`, `docs/`, or top-level project planning docs as of 2026-07-04.
- Root app and `apps/telegram-miniapp` configuration should be consolidated or documented as an intentional monorepo direction.
- Replace temporary organizer RLI placeholder in event cards with real RLI data after the profile/reputation model is implemented.
- Add deeper empty-state actions on the home screen when there are no upcoming events.
- Add server-side n8n notifications for requests and event updates; do not keep the Mini App running in background for notifications.

## Sprint 2 - Infrastructure Hardening

- Sprint 2 architecture preparation is complete at documentation level. Runtime implementation tasks remain below.
- Real Supabase database.
- Production `supabase/migration_v1.sql` applied and verified on 2026-07-04.
- Add release checklist for `supabase/verify_schema.sql`.
- Supabase RLS hardening.
- Roles and permission enforcement.
- ACT-CHAT-001 Optional activity chat architecture: organizer can enable chat per Activity with `chat_enabled`, `chat_auto_delete_enabled`, and `chat_auto_delete_after_hours`.
- Chat data model for `activity_chats`, `activity_chat_messages`, and `activity_chat_members`.
- Chat RLS design: only organizer, confirmed participants, admin, and moderator can read chat; guests, pending users, rejected users, and blocked users cannot.
- Activity settings design for "Create chat for participants" toggle.
- Server-side admin role enforcement for event deletion and moderation.
- Replace Sprint 1 admin allowlist with server-side enforcement.
- User interests.
- Favorite activity persistence in Supabase.
- User privacy settings.
- Delete account flow.
- Keep Sport vertical stable as the reference implementation; do not start Friends, Travel, or Dating.

## Sprint 3 - Performance and n8n Notifications

- Sprint 3 future-capability architecture is complete at documentation level. Heavy runtime features remain intentionally unimplemented.
- CAL-001 Save Activity to Google Calendar through a template URL without OAuth.
- ACT-CHAT-002 Auto-delete chat after activity: archive by default 24 hours after Activity end.
- Activity Chat MVP with participant-only access.
- Event Details design for "Participant chat" button and locked/archived states.
- Rich Telegram share via bot message: send event invitations through Telegram Bot API with an inline `[Присоединиться]` button so the URL is not visible in the message text.
- Lazy loading for heavy screens and vertical modules.
- Code splitting for Dashboard, Discover, Create Event, Event Details, Profile, Organizer Dashboard, and Sport vertical.
- Bundle optimization and Vite chunk review.
- Telegram Mini App startup performance checks.
- Add server-side n8n notifications for join requests and event updates.
- Notification preferences.
- Evening personalized digest.
- Respect quiet hours and working hours; never send AI/n8n digest at night.
- Telegram notification bot.
- Store digest sends in `notification_digest_log`.

## Sprint 4 - AI Event Discovery

- ACT-CHAT-003 n8n chat cleanup workflow.
- ACT-CHAT-004 Chat notifications with quiet hours, notification opt-out, and no messages after archive.
- Chat report/block flow.
- Chat moderation hold for open complaints.
- Replace `SimpleRecommendationEngine` with an AI-backed implementation behind the existing `RecommendationEngine` interface.
- n8n event discovery workflow.
- Discovery source coverage: public event websites, Facebook Events, Meetup, Eventbrite, city sites, universities, Telegram, Discord, Reddit, and public calendars.
- MVP discovery source policy: public sources, RSS/API, public Telegram channels, manual moderation, and user suggestions first.
- Facebook Groups future integration only through official API or manual review; no personal account automation.
- AI event normalization.
- AI duplicate detection.
- Event lifecycle job for `published` -> `expired` / `completed`.
- Store discovered events in the database before digest selection.
- Source management admin panel.

## Later - Friends Vertical

- VERT-015 Friends vertical.
- Friends invite/request flow.
- Friends group social matching.
- Friends notification templates.
- Start only after database and notification foundation is stable.

## Later - Travel Vertical

- VERT-023 Travel vertical placeholder.
- Travel activity model.
- Travel source discovery integration.
- Start only after Friends and source discovery architecture are stable.

## Last - Dating Vertical

- VERT-008 Dating vertical architecture.
- VERT-009 Dating profile.
- VERT-010 Like/pass flow.
- VERT-011 Mutual match.
- VERT-012 Anonymous dating chat.
- VERT-013 Mutual identity reveal.
- VERT-014 Dating safety: report/block.
- Anonymous mode.
- Reveal contact by mutual consent.
- Reporting / blocking.
- Rate limiting.
- Anonymous chat.
- Auto-expiring chats.
- Admin moderation.
- Audit logs.
- Start last, after privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection are ready.

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

## Optional Activity Chat

- ACT-CHAT-001 Optional activity chat.
  Organizer can enable chat for a specific Activity. Chat exists only around that Activity and is not a permanent messenger.
- ACT-CHAT-002 Auto-delete chat after activity.
  Default MVP behavior is archive, not hard delete: `chat.status = archived`, `archived_at = activity.ends_at + 24h`, messages hidden from UI, moderation/audit metadata retained for a limited period.
- ACT-CHAT-003 n8n chat cleanup workflow.
  Runs hourly, archives/deletes eligible chats, logs the action, and skips chats with open complaints or moderation hold.
- ACT-CHAT-004 Chat notifications.
  Notify only participants, respect quiet hours, allow opt-out, do not send after Activity end/archive.
- UX copy to localize later:
  - RU: "Создать чат для участников", "Чат участников", "Чат откроется после подтверждения участия", "Чат будет удалён через 24 часа после события", "Чат архивирован".
  - UA: "Створити чат для учасників", "Чат учасників", "Чат відкриється після підтвердження участі", "Чат буде видалено через 24 години після події", "Чат архівовано".
  - CS: "Vytvořit chat pro účastníky", "Chat účastníků", "Chat se otevře po potvrzení účasti", "Chat bude smazán 24 hodin po události", "Chat archivován".
  - EN: "Create chat for participants", "Participant chat", "Chat opens after participation is confirmed", "Chat will be deleted 24 hours after the event", "Chat archived".

## Sprint 5 - Privacy Review

- Activity Chat privacy review.
- Activity Chat retention policies.
- Optional encrypted chat research.

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

## Architecture Documentation

- ARCH-001 GO IRL Constitution.
- ARCH-002 Database architecture.
- ARCH-003 RLS design.
- ARCH-004 Admin architecture.
- ARCH-005 Moderation architecture.
- ARCH-006 Notification platform architecture.
- ARCH-007 AI platform and event discovery architecture.
- ARCH-008 Recommendation Engine v2 design.
- ARCH-009 Event lifecycle.
- ARCH-010 User lifecycle.

## Calendar

- CAL-001 Save Activity to Google Calendar through a template URL without OAuth.
- CAL-002 Future native calendar integration.
- CAL-003 Future Google OAuth calendar sync.

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
- VERT-018 ActivityRendererRegistry production wiring.
- VERT-019 Sport Activity Card.
- VERT-020 Sport Details screen.
- VERT-021 Sport Create Flow.
- VERT-022 SportRecommendationEngine.
- VERT-023 Travel vertical placeholder.

Deferred vertical rule:

- Friends is not started until database and notification foundation is stable.
- Travel is not started until Friends and source discovery architecture are stable.
- Dating is last and requires privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection first.
