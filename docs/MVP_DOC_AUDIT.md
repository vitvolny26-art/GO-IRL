# MVP Documentation Audit

Generated: 2026-07-08

## Scope

This audit records documentation conflicts found during the MVP 1.1 sanitation pass.

Rules:

- Documentation-only audit.
- No code changes.
- No `.env`, secrets, Supabase RLS, auth, or SQL changes.
- Historical documents remain preserved, but must not be used as current implementation truth.

## Sources of truth

| Area | Source of truth | Decision |
|---|---|---|
| Product philosophy | `docs/GO_IRL_CONSTITUTION.md` | Absolute source of truth for philosophy and architecture principles. |
| Current code scope | `README.md` | Source of truth for what is currently implemented in the app. |
| Release state | `RELEASE_NOTES.md` | Must reflect shipped/beta blockers and not contradict `README.md`. |
| Coach scope | `docs/SPORT_COACH_MVP.md` | Source for Sport Coach 1.1 boundaries after this audit. |
| Documentation registry | `DOCS_INDEX.md` | Source for document status and deprecation warnings. |

## Conflict registry

| ID | Conflict | Files | Status | Resolution |
|---|---|---|---|---|
| DOC-AUTH-001 | Trusted Auth appeared as production path in `README.md` but public blocker in `RELEASE_NOTES.md`. | `README.md`, `RELEASE_NOTES.md`, `PATCH_REPORT.md` | Fixed in docs. | `RELEASE_NOTES.md` now marks Trusted Auth as `[SHIPPED/PRODUCTION PATH]`; remaining items are operational verification. |
| DOC-COACH-001 | Sport Coach doc promised Role Choice and Review Flow as MVP 1.1 while current UI basis is `CoachRequestPanel.tsx`. | `docs/SPORT_COACH_MVP.md`, `src/components/CoachRequestPanel.tsx`, `src/coachFeature.ts` | Fixed in docs. | Added factual UI section; Role Choice and Review Flow moved to `[FUTURE VISION 1.2+]`. |
| DOC-SPRINT0-001 | Sprint 0 status references Netlify as production proof while current beta flow uses Vercel. | `SPRINT0_STATUS.md`, `BETA_CHECKLIST.md`, `DEPLOYMENT.md` | Contained. | `SPRINT0_STATUS.md` marked as historical snapshot / deprecated for code generation. |
| DOC-SETUP-001 | Legacy setup docs contain local Windows paths and desktop helper assumptions. | `SETUP.md`, `SETUP_RU.md`, `CHECKLIST.md` | Contained. | Added historical/deprecated status banners. Current setup is `README.md` + `DOCS_INDEX.md`. |
| DOC-BIBLE-001 | Bible archive is structured but not complete; numbering and MVP scope are inconsistent. | `docs/bible/*`, `DOCS_INDEX.md` | Open. | Completion audit and roadmap exist; do not treat Bible as final GO IRL 1.0 set. |
| DOC-CHAT-001 | Activity Chat has current temporary implementation, while future docs imply broader retention/moderation/notification behavior. | `src/components/ActivityChatPanel.tsx`, `src/activityChatFeature.ts`, `docs/MISSING_SECTIONS.md` | Open. | Chat limits must be documented as MVP boundary; advanced lifecycle remains future. |
| DOC-DEMO-001 | Browser Demo Mode is critical for beta, but boundaries are not centralized. | `README.md`, `BETA_TESTING.md`, `docs/MISSING_SECTIONS.md` | Open. | Missing section created for Demo Mode rules: fake user, demo events, no production writes. |
| DOC-TMA-001 | Telegram Mini App constraints are spread across docs and code. | `README.md`, `docs/MISSING_SECTIONS.md` | Open. | Missing section created for Mini App constraints: initData, explicit close, no background polling. |
| DOC-WEATHER-001 | Weather widget behavior exists but boundaries are not centralized. | `src/weather.ts`, `src/verticals/SportVertical.tsx`, `docs/MISSING_SECTIONS.md` | Open. | Missing section created for forecast availability and Open-Meteo limits. |

## Current implementation boundaries

### Trusted Auth

Status: `[SHIPPED/PRODUCTION PATH]` in documentation.

Remaining release work is operational verification, not a reason to list Trusted Auth as an unshipped public blocker.

### Sport Coach

Current UI basis:

```text
src/components/CoachRequestPanel.tsx
src/coachFeature.ts
```

Future-only scope:

```text
Role Choice bottom sheet
Review Flow
Universal Event Roles
Verified coach badge
Payments / marketplace
```

### Activity Chat

Current MVP boundary:

- Temporary activity coordination chat.
- Advanced chat lifecycle, retention policy, moderation tools, and notifications are not final MVP truth until audited.

### Browser Demo Mode

Current missing documentation boundary:

- Browser without Telegram should open the app.
- Demo writes must not touch production Supabase.
- Fake user and demo events need central documentation.

### Telegram Mini App

Current missing documentation boundary:

- Telegram `initData` and trusted auth reality.
- Explicit user-triggered close only.
- No surprise close.
- No background polling.

## Next actions

1. Fill `docs/MISSING_SECTIONS.md` into current docs one section at a time.
2. Audit `docs/Database.md` and Bible database chapter against Supabase schema and migrations.
3. Audit `DEPLOYMENT.md` for Vercel-first wording.
4. Refresh `project-audit/GO_IRL_PROJECT_AUDIT.md` after documentation cleanup.
