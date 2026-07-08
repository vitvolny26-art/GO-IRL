# Task 1.1 Restore Coach + Chat

Generated: 2026-07-07T14:56:17.301Z
Updated: 2026-07-08

Status: **implemented in current UI / needs runtime verification**.

## Current code findings

| Area | Current status |
|---|---|
| `CoachRequestPanel` component | Present: `src/components/CoachRequestPanel.tsx`. |
| `ActivityChatPanel` component | Present: `src/components/ActivityChatPanel.tsx`. |
| Sport sheet integration | Present in `src/verticals/SportVertical.tsx`. |
| Weather integration | Still present before Coach/Chat; not removed by restore. |
| Backup file | No committed `.bak` file found in repository search. |

## Current integration points

`src/verticals/SportVertical.tsx` imports:

```ts
import { ActivityChatPanel } from "../components/ActivityChatPanel";
import { CoachRequestPanel } from "../components/CoachRequestPanel";
```

Inside `SportActivitySheet`, after weather/place details:

```tsx
<CoachRequestPanel activity={activity} userRole={userRole} />
<ActivityChatPanel activity={activity} />
```

## Supabase tables expected by feature code

Coach:

- `coach_profiles`
- `coach_requests`
- `coach_reviews`

Activity chat:

- `activity_chats`
- `activity_chat_messages`

Supporting SQL files found by repository search:

- `supabase/migration_v7_coach_requests_and_ratings.sql`
- `supabase/migrations/20260704_coach_requests_and_ratings.sql`
- `supabase/verify_coach_requests_and_ratings.sql`
- `supabase/migration_v8_activity_chat.sql`
- `supabase/verify_activity_chat.sql`

No SQL was changed in this audit.

## What changed in original restore

- Added `ActivityChatPanel` import.
- Added `CoachRequestPanel` import.
- Mounted `CoachRequestPanel` inside `SportActivitySheet`.
- Mounted `ActivityChatPanel` inside `SportActivitySheet`.

## What to check in app

1. Open a sport event details sheet.
2. After map/place block, verify Trainer block appears.
3. Verify Event Chat block appears.
4. Open chat.
5. Send test message if authenticated or in browser demo mode.
6. Click Trainer request button.
7. Confirm Weather block still works.
8. Confirm opening the sport sheet does not show a black screen.

## Current risk

Runtime verification is still required because this environment cannot run the app or Supabase locally.

Main risk areas:

- missing Supabase migration in production;
- trusted auth not ready in production;
- browser demo mode fallback not active outside localhost;
- RLS denying chat/coach writes for real Telegram users.

## Next action

Continue with Browser Mock Mode hardening so non-Telegram browser testing cannot accidentally write to production Supabase.
