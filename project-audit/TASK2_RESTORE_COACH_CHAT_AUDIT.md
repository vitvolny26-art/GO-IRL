# Task 2 Audit: Restore Coach + Activity Chat

Generated: 2026-07-08

## Goal

Restore and stabilize the Sport Coach and Activity Chat surfaces without breaking Weather.

This audit is documentation-only. No runtime code, env, Supabase RLS, auth, or SQL was changed.

## Current status

| Area | Status | Notes |
|---|---|---|
| `CoachRequestPanel` component | present | `src/components/CoachRequestPanel.tsx` exists and renders request UI. |
| `ActivityChatPanel` component | present | `src/components/ActivityChatPanel.tsx` exists and renders collapsible chat UI. |
| `coachFeature.ts` data layer | present | Supports Supabase `coach_requests` and localhost demo localStorage. |
| `activityChatFeature.ts` data layer | present | Supports Supabase `activity_chats`, `activity_chat_messages`, RPC `go_irl_ensure_activity_chat`, and localhost demo localStorage. |
| `SportVertical` integration | present | Imports both panels and renders them in `SportActivitySheet`. |
| Weather integration | present | `SportActivitySheet` uses `getEventWeather` before Coach/Chat render. |
| Supabase coach migration | present | `supabase/migrations/20260704_coach_requests_and_ratings.sql`. |
| Supabase chat migration | present | `supabase/migration_v8_activity_chat.sql`. |

## Files inspected

- `src/verticals/SportVertical.tsx`
- `src/components/CoachRequestPanel.tsx`
- `src/components/ActivityChatPanel.tsx`
- `src/coachFeature.ts`
- `src/activityChatFeature.ts`
- `supabase/migrations/20260704_coach_requests_and_ratings.sql`
- `supabase/migration_v8_activity_chat.sql`

## Runtime integration facts

### SportVertical

`SportVertical.tsx` imports:

- `ActivityChatPanel` from `../components/ActivityChatPanel`
- `CoachRequestPanel` from `../components/CoachRequestPanel`
- `getEventWeather` from `../services/weather`

In `SportActivitySheet`, Weather state and fetch logic are initialized before rendering the details list. Coach and Chat are rendered after the weather/details/place blocks and before members/actions.

Current render order:

1. Sport hero
2. Sport chips
3. Detail list
4. Weather toggle/details
5. Place card
6. `CoachRequestPanel`
7. `ActivityChatPanel`
8. Members block
9. Actions

This means Coach/Chat are restored in the sport detail sheet and do not replace Weather.

## Coach audit

### UI

`CoachRequestPanel` currently supports:

- loading current user key;
- loading existing coach requests for activity;
- organizer/admin/moderator request action;
- participant interest action;
- status labels for `pending`, `matched`, `confirmed`, `completed`, `rejected`, `cancelled`;
- simple success/error messages.

### Data layer

`coachFeature.ts` currently supports:

- `getCurrentCoachUserKey()`;
- `loadCoachRequestsForActivity(activityId)`;
- `requestCoachForActivity(activity, requestType)`;
- `cancelCoachRequest(requestId)`.

Supabase tables used:

- `coach_profiles`
- `coach_requests`
- `coach_reviews`

### Demo behavior

`coachFeature.ts` has localhost demo mode:

- fake user key: `telegram:999999`;
- localStorage key: `go-irl-demo-coach-requests-v1`;
- writes stay in localStorage when hostname is `localhost` or `127.0.0.1` and trusted auth is not ready.

### Risks

- Text inside `CoachRequestPanel` is hardcoded Russian. It bypasses i18n.
- Demo mode only triggers on `localhost` / `127.0.0.1`. It may not cover deployed browser preview without Telegram.
- MVP 1.1 requires confirmed demo coach behavior, but current demo request status is `pending`.
- Sport card badge `✨ Есть тренер` is not confirmed in current inspected card code.

## Activity Chat audit

### UI

`ActivityChatPanel` currently supports:

- collapsed toggle;
- lazy chat load only when opened;
- chat expiry display;
- visible messages;
- send message input;
- access/send errors.

### Data layer

`activityChatFeature.ts` currently supports:

- `getCurrentChatIdentity()`;
- `ensureActivityChat(activityId)`;
- `loadActivityChat(activityId)`;
- `loadActivityChatMessages(activityId)`;
- `sendActivityChatMessage(activityId, body)`;
- `hideOwnActivityChatMessage(messageId)`.

Supabase objects used:

- `activity_chats`
- `activity_chat_messages`
- RPC: `go_irl_ensure_activity_chat`

### Demo behavior

`activityChatFeature.ts` has localhost demo mode:

- fake user key: `telegram:999999`;
- fake display name: `Vit_Test`;
- localStorage key: `go-irl-demo-activity-chat-v1`;
- writes stay in localStorage when hostname is `localhost` or `127.0.0.1` and trusted auth is not ready.

### Risks

- Text inside `ActivityChatPanel` is hardcoded Russian. It bypasses i18n.
- Chat expiry in SQL is currently `now() + interval '24 hours'`, not event start time + 24h.
- Demo mode only triggers on `localhost` / `127.0.0.1`. It may not cover deployed browser preview without Telegram.
- `ensureActivityChat()` runs on open and may create chat as a side effect for every eligible opener.

## Supabase audit

### Coach migration

`supabase/migrations/20260704_coach_requests_and_ratings.sql` defines:

- `coach_profiles`
- `coach_requests`
- `coach_reviews`
- RLS policies for own/organizer/moderator access
- rating recalculation function and trigger
- indexes

### Chat migration

`supabase/migration_v8_activity_chat.sql` defines:

- `activity_chats`
- `activity_chat_messages`
- RLS policies for participant/organizer/moderator access
- `go_irl_can_access_activity_chat`
- `go_irl_can_write_activity_chat`
- `go_irl_ensure_activity_chat`
- expiry/cleanup helper functions

## Minimal next patch recommendation

Do not rewrite Coach or Chat.

Next patch should be small and low-risk:

1. Add visibility guards so Coach/Chat render only for sport detail where they are useful and do not create noisy UX for unrelated cases.
2. Localize visible Russian strings through `i18n.ts`, or at minimum keep hardcoded text out of reusable component surfaces.
3. Add confirmed demo coach behavior only for browser demo mode.
4. Defer SQL changes for chat expiry until explicitly approved, because it touches Supabase logic.

## Definition of Done for Task 2

- Coach panel opens in sport event detail without black screen.
- Chat panel opens in sport event detail without black screen.
- Weather summary and details still work.
- Demo/browser mode does not write to production Supabase.
- `pnpm run lint` PASS.
- `pnpm run build` PASS.
- `pnpm run test` PASS.
- No RLS/auth/destructive SQL changes without explicit approval.
