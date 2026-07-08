# Task 4 Event Card Time Fix Report

Generated: 2026-07-08

Status: **implemented / Vercel pending at creation time / local lint-build-test pending**.

## Goal

Event time must render consistently across event cards.

Requirements:

- time should be displayed consistently on all event cards;
- there should be no empty time badge;
- Event Card rendering should be unified without broad refactor.

## Root cause

Generic and Discover cards already rendered `activity.time` through `formatEventTime(activity.time)`.

Sport cards rendered sport duration instead:

```tsx
{meta.durationMinutes || 90} {t.minutesShort}
```

This made sport cards show `90 мин` where other cards showed actual event start time such as `18:30`.

## Changed file

| File | Change |
|---|---|
| `src/verticals/SportVertical.tsx` | Sport card now derives `eventTime = formatEventTime(activity.time)` and renders the time chip only when valid. |

## Current behavior

Sport card chip row now renders:

- sport type;
- participant count;
- event start time, if valid.

Invalid/empty time produces no time chip, so no blank time badge is rendered.

## Scope intentionally not changed

- No architecture refactor.
- No generic card rewrite.
- No event model changes.
- No Supabase change.
- No weather change.
- Sport details sheet still keeps sport duration in sheet chips, because this is event detail metadata, not card start-time rendering.

## Verification needed

Run:

```bash
pnpm run lint
pnpm run build
pnpm run test
```

Manual UI check:

1. Open Home.
2. Compare generic activity cards and sport cards.
3. Confirm sport cards show event start time, not duration.
4. Confirm cards with invalid time do not show an empty time badge.
5. Open sport details and confirm Weather still works.
