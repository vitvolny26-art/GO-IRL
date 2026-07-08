# Task 6 Bug Report Fix Report

Generated: 2026-07-08

Status: **implemented / no code change required**.

## Goal

Bug report button requirements:

- must not copy event share text;
- should open Telegram support link or feedback form;
- should not use `window.alert`;
- later: Supabase table `feedback_reports`.

## Current implementation

`src/bugReport.ts` currently:

- imports `getTelegramWebApp`;
- uses `bugReportUrl = "https://t.me/GOirl_bot"`;
- opens support through `webApp.openTelegramLink()` when available;
- falls back to `webApp.openLink()`;
- falls back to `window.open()` in a normal browser.

## Result

| Requirement | Status |
|---|---|
| No share text copying | PASS |
| Opens Telegram support link | PASS |
| No `window.alert` | PASS |
| Feedback table | Future scope |

## Scope intentionally not changed

No code change was needed.

No Supabase table was created because `feedback_reports` is explicitly future scope and would require database/RLS planning.

## Manual check

1. Open event details.
2. Open more menu.
3. Click `Сообщить о баге`.
4. Confirm it opens `https://t.me/GOirl_bot` or browser fallback.
5. Confirm share text is not copied.
6. Confirm no alert popup appears.
