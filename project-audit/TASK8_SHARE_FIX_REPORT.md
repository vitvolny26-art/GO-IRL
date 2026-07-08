# Task 8 Share Fix Report

Generated: 2026-07-08

Status: **mostly implemented / OG image hardened**.

## Goal

Share fix requirements:

- use Telegram Mini App direct link:
  `https://t.me/BOT_USERNAME/APP_NAME?startapp=EVENT_ID`;
- remove App Store redirect on iOS;
- make `/join/:id` landing path;
- add Open Graph:
  - `og:title`;
  - `og:description`;
  - `og:image`.

## Current implementation findings

| Requirement | Status |
|---|---|
| Telegram Mini App direct link | Implemented in `src/App.tsx` via `activityInviteUrl()`. |
| `/join/:id` path handling | Implemented in `src/App.tsx` via `activityIdFromJoinPath()`. |
| App Store redirect removal | No App Store redirect found in current share flow. |
| `og:title` | Implemented in `index.html`. |
| `og:description` | Implemented in `index.html`. |
| `og:image` | Hardened to absolute URL. |
| Dynamic per-event OG | Pending future backend/edge route. |

## Changed file

| File | Change |
|---|---|
| `index.html` | Changed `og:image` and `twitter:image` from relative `/brand/logo-wide.png` to absolute `https://go-irl.vercel.app/brand/logo-wide.png`. |

## Why

Social preview crawlers usually require absolute image URLs. Relative `og:image` can fail outside the app origin context.

## Current share flow

`src/App.tsx` builds event invite URL from env values:

```text
https://t.me/{VITE_GO_IRL_BOT_USERNAME}/{VITE_GO_IRL_APP_NAME}?startapp={EVENT_ID}
```

The share text is then rendered by `ShareTemplateService.buildPlainText()`.

## `/join/:id` behavior

The app reads `/join/:id`, opens the matching activity if it exists in the loaded activity list, then replaces the browser path with `/`.

## Scope intentionally not changed

No routing refactor.

No server-side dynamic OG image generation.

No bot configuration change.

No `.env` changes.

## Manual verification

1. Share a sport event.
2. Confirm the shared text contains a `t.me/...startapp=EVENT_ID` link.
3. Open `/join/{eventId}` in browser.
4. Confirm the event sheet opens.
5. Send the app URL in Telegram and confirm preview image appears.
