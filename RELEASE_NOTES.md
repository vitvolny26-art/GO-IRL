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
- Russian and Czech localization structure is in place.

### Before Public Release

- Configure production environment variables on Vercel.
- Apply `supabase/schema.sql` to the production Supabase project.
- Re-check private activity visibility with an unrelated account after schema deployment.
- Confirm RLS behavior with at least two Telegram accounts.
- Validate Telegram share links through `@GOirl_bot`.
- Add trusted Telegram `initData` validation before treating identity as secure.
