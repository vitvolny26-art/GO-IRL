# Release Notes

## 0.1.0 - Internal Telegram Mini App MVP

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

### Before Public Release

- Configure production environment variables on Vercel.
- Production Supabase schema was applied and verified on 2026-07-04.
- Re-check private activity visibility with an unrelated account before public launch.
- Confirm RLS behavior with at least two Telegram accounts.
- Validate Telegram share links through `@GOirl_bot`.
- Validate explicit Mini App close behavior on real Telegram clients.
- Add trusted Telegram `initData` validation before treating identity as secure.
- Replace temporary admin allowlist with server-side role enforcement before public moderation tools launch.
