# Task 3 Browser Mock Mode Report

Generated: 2026-07-08

Status: **implemented / Vercel build passed / local lint-build-test still pending**.

## Goal

A regular browser without Telegram must open the app in safe demo mode.

Demo mode requirements:

- fake user id: `999999`;
- fake user name: `Vit_Test`;
- Olomouc demo events:
  - Volleyball;
  - Board games;
  - Running;
  - Walking;
  - Coffee meetup;
  - Language exchange;
- demo writes must not touch production Supabase;
- UI notice after demo writes: `Изменения сохранены (Демо-режим)`.

## Root cause

Browser demo behavior existed, but it was limited to `localhost` / `127.0.0.1`.

That meant the deployed Vercel browser without Telegram `initData` could still fall through into production Supabase read/write paths instead of local demo state.

## Changed files

| File | Change |
|---|---|
| `src/store.ts` | Demo mode now activates when there is no trusted auth and no Telegram `initData`, not only on localhost. Demo writes stay in `localStorage`. Realtime subscription is skipped in demo mode. |
| `src/coachFeature.ts` | Coach demo requests now use the same browser-without-Telegram demo condition. |
| `src/activityChatFeature.ts` | Activity chat demo messages now use the same browser-without-Telegram demo condition. |

## Current demo condition

Demo mode is active when:

```text
window exists
AND trusted auth is not ready
AND Telegram initData is missing
```

Telegram Mini App behavior is preserved because real Telegram launches provide `Telegram.WebApp.initData`.

## Safety boundary

In demo mode:

- event create/update/delete writes go to `localStorage`;
- join/request actions update local demo activities;
- coach requests go to local demo storage;
- activity chat and messages go to local demo storage;
- Supabase realtime is not subscribed from the store;
- production Supabase writes are not called by these demo paths.

## Verification already available

GitHub/Vercel status:

- latest checked commit: `4209e696bffdd25f9ffa7533fee3100c0f732ef4`;
- Vercel status: `success`.

## Required local verification

Still required in Codespaces or local repo:

```bash
pnpm run lint
pnpm run build
pnpm run test
```

## Manual browser test

1. Open the Vercel app URL in a normal browser, not inside Telegram.
2. Confirm demo events are visible.
3. Create a test event.
4. Confirm UI shows: `Изменения сохранены (Демо-режим)`.
5. Refresh the page.
6. Confirm the created test event persists from local demo state.
7. Join/leave a demo event.
8. Open a sport event.
9. Confirm Coach and Chat work without Supabase write errors.
10. Confirm the same app opened inside Telegram still uses Telegram auth flow.

## Risk

Local lint/build/test have not been executed in this environment because repository execution is not available here.

A manual full-file update was needed for `src/store.ts` through GitHub API. One accidental production insert change was found immediately and fixed in commit `c45a9107aa3660d8cf8306d2de8287cab04a9251`.
