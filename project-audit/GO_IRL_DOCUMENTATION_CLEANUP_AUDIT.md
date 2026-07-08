# GO IRL Documentation Cleanup Audit

Generated: 2026-07-08

Status: **current documentation audit**.

Scope: documentation-only cleanup for GO IRL App 1.0 / 1.1 stabilization.

This audit did not modify:

- application code;
- `.env` or secrets;
- Supabase SQL;
- Supabase RLS;
- auth implementation;
- migrations;
- architecture.

## Summary

The documentation set is now safer to use because historical and future-facing files are separated from current MVP / beta source-of-truth documents.

Key outcome: future platform vision is no longer allowed to silently read as current App 1.0 scope.

## Files updated in this cleanup

| File | Change | Status |
|---|---|---|
| `DOCS_INDEX.md` | Added source-of-truth map, status registry, conflict list, and Bible status. | Current registry |
| `SETUP.md` | Added deprecated banner and current Codespaces/pnpm guidance. | Deprecated / historical |
| `SETUP_RU.md` | Added deprecated banner and current Codespaces/pnpm guidance. | Deprecated / historical |
| `PATCH_REPORT.md` | Added historical snapshot banner. | Historical snapshot |
| `docs/DOCUMENTATION_AUDIT.md` | Added documentation-wide audit, missing sections, risks, and commit plan. | Current audit |
| `docs/bible/00-completion-audit.md` | Split missing Bible sections into App 1.0 and 1.1+. | Current Bible audit |
| `docs/bible/00-bible-roadmap.md` | Clarified Bible 1.0 and 1.1+ completion path. | Current Bible roadmap |
| `RELEASE_NOTES.md` | Clarified trusted auth status: implemented in repo, still blocked for public release until deployed/migrated/smoke-tested. | Partly current |
| `supabase/README.md` | Clarified migration v4 / trusted-auth release status without changing SQL. | Partly current / production-sensitive |

## Current source-of-truth documents

| Area | Source |
|---|---|
| Product and architecture principles | `docs/GO_IRL_CONSTITUTION.md` |
| Current app setup and implemented scope | `README.md` |
| Current product direction | `ROADMAP.md` |
| Confirmed work queue | `BACKLOG.md` |
| Development safety rules | `docs/DEVELOPMENT_PROTOCOL.md` |
| Closed beta validation | `BETA_TESTING.md`, `BETA_CHECKLIST.md` |
| Release notes | `RELEASE_NOTES.md` |
| Supabase setup | `supabase/README.md` |
| Documentation registry | `DOCS_INDEX.md` |
| Bible completion | `docs/bible/00-completion-audit.md`, `docs/bible/00-bible-roadmap.md` |

## Confirmed documentation decisions

### 1. Deprecated setup files preserved

`SETUP.md` and `SETUP_RU.md` are not deleted because they are project history. They are now clearly marked as deprecated.

Reason: both describe old local Windows setup paths and `.bat` / `.ps1` desktop helper scripts. Current GO IRL workflow is Codespaces + pnpm.

### 2. Patch report preserved as historical snapshot

`PATCH_REPORT.md` is not current release truth. It remains useful as implementation history for trusted-auth patching.

### 3. Bible is not complete

The Bible is preserved and structured, but not final.

Bible completion now has a version split:

- App 1.0: beta-ready MVP, Telegram Mini App constraints, Olomouc scope, Browser Demo Mode, event/chat/share/weather/profile boundaries, QA gates.
- App 1.1+: Sport Coach lifecycle, coach reviews, expanded moderation, notifications, recommendation engine, AI event discovery, multi-vertical platform, admin surface.

### 4. Trusted auth wording clarified

Current safe statement:

- trusted auth is implemented in repository;
- public release is still blocked until Edge Function secrets are configured, migration v4 is applied/verified, and real Telegram smoke tests pass;
- legacy `x-go-irl-user-key` is demo/local compatibility only and unsafe for public production.

## Current unresolved documentation conflicts

| Conflict | Files | Status |
|---|---|---|
| Trusted auth implemented vs production-ready wording | `README.md`, `RELEASE_NOTES.md`, `docs/Security.md`, `supabase/README.md` | Partly resolved; needs live production verification result. |
| Sport Coach docs vs current restored UI | `docs/SPORT_COACH_MVP.md`, `src/components/CoachRequestPanel.tsx`, `src/verticals/SportVertical.tsx` | Needs code/UI audit after Coach restoration. |
| Activity Chat docs vs current restored UI | `README.md`, `docs/Moderation.md`, `src/components/ActivityChatPanel.tsx` | Needs code/UI audit after Chat restoration. |
| Future multi-vertical platform vs Sport-first beta | `ROADMAP.md`, `docs/vertical-experiences.md`, `src/types.ts`, `src/verticals/*` | Must stay marked as future platform architecture. |
| Historical Netlify vs current Vercel flow | `SPRINT0_STATUS.md`, `DEPLOYMENT.md`, `BETA_CHECKLIST.md`, `vercel.json` | Needs deployment-doc audit. |
| Generated snapshot docs vs current source of truth | `GO_IRL_DOCUMENTATION.md`, `PATCH_REPORT.md`, `project-audit/*` | Partly resolved; `GO_IRL_DOCUMENTATION.md` still needs archive banner. |

## Existing health audit snapshot

`project-audit/GO_IRL_HEALTH_AUDIT.md` is an older health snapshot from 2026-07-07.

It reported:

- lint: FAIL;
- build: PASS;
- test: PASS.

The recorded lint failure came from:

- temporary root `.cjs` patch scripts;
- `scripts/go-irl-health-audit.cjs` linting as browser/TypeScript source;
- unused `BOT_USERNAME` in `src/App.tsx`.

This cleanup did not fix those code/tooling issues because the current scope is documentation-only.

## Verification status

Not run in this environment.

Reason: the available execution container could not resolve GitHub hostnames, so repository clone and local `pnpm` checks could not be executed here.

Required checks in Codespaces:

```bash
pnpm run lint
pnpm run build
pnpm run test
git status
```

Expected:

```text
lint PASS
build PASS
test PASS
working tree clean
```

## Next documentation tasks

1. Add archive banner to `GO_IRL_DOCUMENTATION.md`.
2. Audit `DEPLOYMENT.md` and `SPRINT0_STATUS.md` for Netlify/Vercel conflict.
3. Audit `docs/SPORT_COACH_MVP.md` against current Coach UI after Restore Coach + Chat is complete.
4. Audit `docs/Database.md`, `docs/RLS.md`, and `docs/bible/03-database-design.md` against Supabase schema without modifying SQL.
5. Update `CHANGELOG.md` after documentation cleanup is verified.

## Do not do from this audit

- Do not delete historical docs.
- Do not run destructive SQL.
- Do not change Supabase RLS/auth/secrets.
- Do not rewrite Bible from scratch.
- Do not mark App 1.0 beta-ready until checks and production smoke tests pass.
