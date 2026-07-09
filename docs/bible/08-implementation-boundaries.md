# GO IRL Bible

# Book VIII

## Implementation Boundaries

Version 1.0 Draft

Status: Current MVP boundary / implementation guardrail

---

## Purpose

This book defines the implementation boundaries that protect GO IRL from accidental overbuild.

It is not a replacement for code, Supabase migrations, or release notes.

It answers one question:

```text
What must developers and AI agents not break while stabilizing MVP?
```

---

## Current stack boundary

Current MVP stack:

```text
React
TypeScript
Vite
pnpm
Supabase
Telegram Mini Apps
Vercel
GitHub Codespaces
```

The MVP must not be rewritten to a new stack during beta stabilization.

Do not introduce a new framework, backend layer, state system, database model, or deployment target unless there is an explicit product and technical decision.

---

## Architecture boundary

Current architecture should be stabilized, not replaced.

Allowed changes:

- small bug fixes;
- UX polish;
- missing guards;
- better demo isolation;
- event card consistency;
- profile save fixes;
- share/join fixes;
- weather fallback fixes;
- documentation alignment;
- focused tests.

Blocked without explicit approval:

- large refactors;
- replacing Supabase model;
- replacing `activities` with future `events`;
- new backend rewrite;
- introducing REST API layer only because future docs mention it;
- global state rewrite;
- broad module registry rewrite;
- auth/RLS redesign;
- destructive SQL;
- force push.

---

## Source of truth order

For implementation decisions, use this order:

1. Current code.
2. `README.md`.
3. `supabase/schema.sql` and `supabase/migration_v*.sql`.
4. `supabase/README.md`.
5. `docs/DATABASE_SCHEMA_AUDIT.md`.
6. `docs/MVP_STABILIZATION_PLAN.md`.
7. `docs/SPORT_COACH_MVP.md`.
8. `docs/bible/*` boundary chapters.
9. Future architecture docs.

If a Bible chapter conflicts with current code and schema, do not change code automatically.

First create or update an audit.

---

## Supabase boundary

Supabase is production-sensitive.

Do not change these without explicit approval:

- `.env` values;
- secrets;
- RLS policies;
- auth policies;
- destructive SQL;
- production data;
- storage bucket policies;
- trusted auth token behavior.

Current schema baseline is not the future `events`/`users` model.

Current baseline uses:

```text
activities
activity_members
admin_users
app_users
coach_profiles
coach_requests
coach_reviews
activity_chats
activity_chat_messages
```

Exact truth must be verified from current schema and migrations before any SQL task.

---

## Trusted auth boundary

Production identity must use trusted Telegram auth path.

Browser fallback, demo identity, and `initDataUnsafe` are not production trust.

Trusted auth work must remain aligned with:

- `README.md`;
- `RELEASE_NOTES.md`;
- `docs/Security.md`;
- `supabase/README.md`;
- current Supabase Edge Function behavior.

Do not weaken auth to make browser tests easier.

Use Browser Demo Mode for local/demo behavior.

---

## Browser Demo Mode boundary

Browser Demo Mode must be safe.

Expected demo identity:

```text
id: 999999
name: Vit_Test
```

Demo mode may simulate:

- user identity;
- demo event list;
- join/save state;
- profile save;
- avatar draft;
- share preview;
- bug report path.

Demo mode must not:

- write to production Supabase;
- pretend to be trusted Telegram auth;
- leak production user data;
- make irreversible changes;
- hide that it is demo mode.

Expected save message:

```text
Изменения сохранены (Демо-режим)
```

---

## Profile and avatar boundary

Profile is an MVP utility, not a social network profile system.

Current MVP profile should support:

- display name;
- city;
- simple avatar behavior;
- save action;
- safe browser demo behavior.

Button wording should be clear:

```text
Сохранить
```

not:

```text
Закрыть
```

Production avatar upload direction:

```text
Supabase Storage avatars
```

Demo avatar direction:

```text
base64/local state
```

Do not build complex public profiles before beta.

Blocked before beta:

- followers;
- profile feed;
- public ratings;
- detailed identity verification;
- profile marketplace;
- dating-style profile fields.

---

## Event Card time boundary

Event time must display consistently across cards and detail views.

There must be no empty time badge.

If event time is missing, UI should either hide the time area cleanly or show an explicit safe fallback.

Do not duplicate multiple time-rendering rules across components without checking where they are used.

---

## Share boundary

Share must support Telegram Mini App flow.

Expected direction:

```text
https://t.me/BOT_USERNAME/APP_NAME?startapp=EVENT_ID
```

The exact bot/app values are deployment configuration, not hardcoded product truth.

Share must not redirect iOS users to irrelevant app-store flow.

Bug report must not copy event share text.

---

## Weather boundary

Weather is a helper, not a blocker.

The MVP weather widget should:

- use no-key forecast source;
- handle unsupported dates clearly;
- avoid fake precision;
- fail gracefully;
- never block create/share/join.

For events farther than the reliable forecast range, use a clear message instead of made-up forecast data.

---

## Activity Chat boundary

Activity Chat is temporary event coordination.

It must not become a general messenger.

Before changing chat logic, verify:

- current UI component;
- current feature module;
- current Supabase migration;
- current RLS rules;
- current expiry behavior.

Known schema audit issue:

```text
current migration: chat creation + 24h
future docs: event end + 24h
```

Do not change this with documentation cleanup.

---

## Coach boundary

Sport Coach is an MVP helper around sport events.

Current basis:

```text
CoachRequestPanel.tsx
coachFeature.ts
coach_requests
```

Current MVP can show/request coach support.

Future only:

- coach marketplace;
- payments;
- verified coach badge;
- full review flow;
- universal Event Roles;
- complex role system.

---

## Quality gates

After any code patch, run:

```bash
pnpm run lint
pnpm run build
pnpm run test
```

Commit only when green.

Documentation-only changes still need review, but they must not claim code is green unless quality gates were actually run.

---

## Developer operating rule

Fix one task at a time.

Before changing a file, understand where it is used.

Do not fix symptoms by creating broader architecture problems.

Do not use future Bible vision as permission to rewrite the MVP.

The MVP target is stability, not maximal feature count.
