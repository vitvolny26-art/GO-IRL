# Release Notes

## 0.1.0 - Internal Telegram Mini App MVP

### Public Release Blocker

GO IRL is still an internal/demo Mini App until trusted Telegram auth is deployed and verified in production. The legacy Supabase RLS model reads `x-go-irl-user-key` from frontend-controlled request headers derived from Telegram `initDataUnsafe` or guest storage. This can be forged and is not safe for public release.

Public release requires:

- deployed `verifyTelegramInitData` Supabase Edge Function;
- RLS based on verified JWT claims;
- removal of `VITE_GO_IRL_ADMIN_KEYS` from the production security model;
- production verification of security hardening migrations.

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
- Deploy `verifyTelegramInitData` and configure required Supabase Edge Function secrets.
- Apply and verify `supabase/migration_v4_trusted_telegram_auth.sql`.
- Replace temporary admin allowlist with server-side role enforcement before public moderation tools launch.
- Apply and verify `supabase/migration_v2_backend_foundation.sql` before enabling public moderation/admin tools.
- Apply and verify `supabase/migration_v3_security_hardening.sql`.
- Do not launch publicly until trusted Telegram auth is deployed, v4 migration is applied, and smoke tests pass.
