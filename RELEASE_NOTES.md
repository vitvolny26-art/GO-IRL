# Release Notes

## Unreleased - Market Positioning Update

### Product Scope Guardrails

GO IRL now has a documented market positioning source of truth for the Olomouc beta:

- `docs/MARKET_POSITIONING.md` defines GO IRL as a Telegram-first local meetup layer, not an event calendar, ticketing platform, sport-only app, dating app, or social feed.
- `docs/COMPETITOR_WATCH.md` tracks competitor signals from sports apps, messenger organizers, community platforms, invite tools, ticketing platforms, and local calendars.
- `ROADMAP.md` and `BACKLOG.md` now enforce the beta guardrail: new scope must help users create, join, coordinate, and attend real-life meetups faster than a normal Telegram chat.

Canonical beta categories stay limited to:

1. Volleyball
2. Running
3. Walking
4. Coffee meetup
5. Board games
6. Language exchange

Explicit non-goals before beta:

- ticketing/payments;
- club CRM;
- subscriptions/premium;
- AI recommendations;
- post-event albums/feed;
- public ratings/reviews;
- direct messages;
- complex profiles;
- big multi-city catalog;
- dating, friends, travel, or broad lifestyle verticals.

## 0.1.0 - Internal Telegram Mini App MVP

### Production Auth Status

Trusted Telegram auth is **[SHIPPED/PRODUCTION PATH]** in the repository and is the documented production model.

Current production path:

- `verifyTelegramInitData` Supabase Edge Function validates Telegram `initData`.
- Frontend uses the verified `accessToken` flow.
- Write operations are guarded until trusted auth is ready.
- Legacy `x-go-irl-user-key` behavior is treated as legacy demo/local compatibility and must not be presented as the public production auth model.

Release verification still requires real-environment smoke checks, but Trusted Auth is no longer listed as a public blocker in these notes.

### Public Release Blockers

Public/beta release still requires operational verification:

- Configure production environment variables on Vercel.
- Confirm Supabase Edge Function secrets are present in production.
- Re-check private activity visibility with an unrelated account before public launch.
- Confirm RLS behavior with at least two Telegram accounts.
- Validate Telegram share links through `@GOirl_bot`.
- Validate explicit Mini App close behavior on real Telegram clients.
- Replace temporary admin allowlist with server-side role enforcement before public moderation tools launch.
- Apply and verify backend/security migrations only through the approved Supabase release process.

GO IRL now has a working Telegram Mini App foundation for Olomouc activities.

### Included

- Create, view, share, edit, and join offline activities.
- Public events join immediately when capacity is available.
- Full events put users into a waiting state.
- Private events create pending requests that the organizer can approve or reject.
- Supabase stores activities and participants and broadcasts realtime updates.
- Supabase RLS now limits non-public activity visibility to organizers, participants, or invite-link visitors.
- Header is fixed, safe-area aware, and ready for Telegram in-app browser behavior.
- Mini App lifecycle UX includes explicit Done / Back to Telegram actions.
- Realtime subscriptions are cleaned up when the app is hidden or unmounted; no background notification polling is used.
- Russian and Czech localization structure is in place.
- Ukrainian and English localization options are available.
- Praha/Prague is available as a configured city while Olomouc stays the default.
- Inline skating is a dedicated activity category.
- Organizers and configured Sprint 1 admins can see a confirmed delete event action.
- GO IRL logo is used in the header, home hero, favicon, app icon, and Open Graph preview.
- Create Event now validates required text, length limits, capacity, and price before publishing.
- Create Event includes quick templates, event city, participant note, URL/date validation, and post-create open/share/close actions.
- Discover / For You helps users find events through instant filters, search, and horizontal personalized sections.
- Profile now stores favorite activities locally for recommendation matching.
- Recommendation matching is isolated behind an engine interface so a future AI engine can replace the simple algorithm without rewriting UI.
- Sport Vertical MVP is live with sport-specific cards, details, create fields, skill level, indoor/outdoor, equipment, duration, demo examples, and a dedicated SportRecommendationEngine.
- Production Supabase now persists `city_id`, `metadata`, `participant_note`, and `activity_type` for events as primary database fields.
- Activities can be saved to Google Calendar through a template link. No Google OAuth or calendar sync is used in this MVP.
- GO IRL Constitution is now the source of truth for product and architecture decisions.
- Sprint 2/3 architecture is prepared for implementation: RLS, admin, moderation, AI discovery, notifications, recommendation engine, event lifecycle, user lifecycle, and optional temporary Activity Chat.
- Backend foundation SQL is ready for Supabase: `user_roles`, moderator/admin helpers, audit log, and verification SQL.
- Security hardening SQL is ready for Supabase: DB-level text length constraints for Activity fields.
- Reputation architecture is documented: RLI is not currency or likes, Trust Score is hidden/internal, and attendance confirmation is future planned work.
- Trusted Telegram auth implementation is added: HMAC validation, `auth_date` validation, replay table, app user upsert, short-lived JWT, frontend `accessToken` flow, and migration v4 for verified-claim RLS.

### Before Public Release

- Configure production environment variables on Vercel.
- Production Supabase schema was applied and verified on 2026-07-04.
- Re-check private activity visibility with an unrelated account before public launch.
- Confirm RLS behavior with at least two Telegram accounts.
- Validate Telegram share links through `@GOirl_bot`.
- Validate explicit Mini App close behavior on real Telegram clients.
- Confirm `verifyTelegramInitData` can issue trusted tokens in production.
- Confirm `supabase/migration_v4_trusted_telegram_auth.sql` is applied and verified in the target Supabase project before broader rollout.
- Replace temporary admin allowlist with server-side role enforcement before public moderation tools launch.
- Apply and verify `supabase/migration_v2_backend_foundation.sql` before enabling public moderation/admin tools.
- Apply and verify `supabase/migration_v3_security_hardening.sql`.

<!-- GO_IRL_STABILIZATION_TASKS_5_8 -->
## Stabilization update: Tasks 5-8

Date: 2026-07-07

Closed stabilization scope:
- Task 5 Profile Fix
  - Profile edit action now saves user changes instead of acting like a close button.
  - Local avatar upload is supported.
- Task 6 Bug Report Fix
  - Bug report action opens support link.
  - Removed alert/copy-share behavior from bug reporting.
- Task 7 Weather Widget
  - Sport event details show Open-Meteo based weather summary and details.
  - Future events outside forecast range show a safe availability message.
- Task 8 Share Fix
  - Share links use Telegram Mini App startapp deep links.
  - Browser /join/:id opens the target activity.
  - Vercel SPA rewrite and Open Graph metadata are present.

Verification:
- pnpm run lint: PASS
- pnpm run build: PASS
- pnpm run test: PASS, 10 files / 51 tests

Related commits:
- cc67706 fix: save profile from edit button
- a021e10 fix: support local profile avatar upload
- dee51af fix: open bug report support link
- a61947d fix: show weather summary in sport sheet
- 7087b86 fix: show weather details in sport sheet
- e44152d fix: use telegram mini app share link
- ea63432 fix: open join route activity
