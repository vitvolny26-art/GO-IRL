# GO IRL Documentation Audit

Status: **current audit / documentation-only**.

Scope: GO IRL App 1.0 / 1.1 documentation cleanup.

This audit works only with documentation state. It does not change code, `.env`, secrets, Supabase RLS, auth, SQL, migrations, or application architecture.

## Executive summary

GO IRL documentation is already partially structured, but it mixes four different layers:

1. Current operational docs for closed beta.
2. Product and architecture source-of-truth docs.
3. Bible / long-form historical product thinking.
4. Generated snapshots and task reports.

The main risk is not missing documentation. The main risk is **scope confusion**: future platform vision can look like current MVP behavior.

The documentation cleanup strategy is therefore:

- preserve historical documents;
- mark deprecated and snapshot docs clearly;
- keep `DOCS_INDEX.md` as the registry;
- separate current MVP 1.0 / 1.1 from future vision;
- move missing information into explicit missing sections instead of inventing it silently.

## Confirmed source-of-truth order

| Priority | File | Role |
|---:|---|---|
| 1 | `docs/GO_IRL_CONSTITUTION.md` | Product and architecture source of truth. |
| 2 | `README.md` | Current setup, stack, implemented scope. |
| 3 | `ROADMAP.md` | Current direction and prioritization. |
| 4 | `docs/DEVELOPMENT_PROTOCOL.md` | Safe development rules. |
| 5 | `BETA_TESTING.md`, `BETA_CHECKLIST.md` | Closed beta validation flow. |
| 6 | `RELEASE_NOTES.md` | Release-facing blockers and notes. |
| 7 | `DOCS_INDEX.md` | Documentation registry and archive policy. |

## Classification model

| Type | Meaning |
|---|---|
| Core | Root-level source used during daily work. |
| Product | Scope, roadmap, principles, MVP/1.1 decisions. |
| Architecture | Technical design and future architecture. |
| QA / Beta | Testing, beta readiness, release validation. |
| Supabase | Database, RLS, auth, migrations, Edge Function docs. |
| Bible | Preserved long-form project Bible. |
| Snapshot | Generated or time-bound report. |
| Deprecated | Do not use as current instructions. |
| Archive | Preserve; not current source of truth. |

## Current document groups

### Core

- `README.md`
- `DOCS_INDEX.md`
- `ROADMAP.md`
- `BACKLOG.md`
- `CHANGELOG.md`
- `RELEASE_NOTES.md`

### Product

- `docs/PRODUCT_PHILOSOPHY.md`
- `docs/GO_IRL_CONSTITUTION.md`
- `docs/MVP_STABILIZATION_PLAN.md`
- `docs/GO_IRL_1_1_STABILIZATION.md`
- `docs/DEVELOPMENT_PROTOCOL.md`
- `docs/SPORT_COACH_MVP.md`

### Architecture

- `docs/Database.md`
- `docs/RLS.md`
- `docs/Security.md`
- `docs/Admin.md`
- `docs/Moderation.md`
- `docs/privacy.md`
- `docs/EventLifecycle.md`
- `docs/UserLifecycle.md`
- `docs/Notifications.md`
- `docs/n8n-workflows.md`
- `docs/AI.md`
- `docs/ai-event-discovery.md`
- `docs/RecommendationEngine.md`
- `docs/reputation.md`
- `docs/vertical-experiences.md`
- `docs/performance.md`

### QA / Beta / Release

- `BETA_CHECKLIST.md`
- `BETA_TESTING.md`
- `CHECKLIST.md`
- `DEPLOYMENT.md`
- `SPRINT0_STATUS.md`
- `SPRINTS.md`
- `project-audit/*`

### Supabase

- `supabase/README.md`
- `supabase/schema.sql`
- `supabase/schema_next.sql`
- `supabase/migrations/*`

Supabase files are audit inputs only during this documentation cleanup. Do not modify them unless there is a separate approved task.

### Bible

- `docs/bible/00-completion-audit.md`
- `docs/bible/00-bible-roadmap.md`
- `docs/bible/01-foundation/01-why-we-exist.md`
- `docs/bible/01-foundation/02-core-principles.md`
- `docs/bible/02-platform-architecture.md`
- `docs/bible/03-database-design.md`
- `docs/bible/04-modules-architecture.md`
- `docs/bible/05-product-requirements.md`
- `docs/bible/06-ux-interaction-guidelines.md`

## Bible status

The Bible is **not complete**.

Current status:

| File | Status | Action |
|---|---|---|
| `docs/bible/00-completion-audit.md` | current audit | Keep and refresh after final reconciliation. |
| `docs/bible/00-bible-roadmap.md` | current roadmap | Keep and update with App 1.0 / 1.1 split. |
| `docs/bible/01-foundation/01-why-we-exist.md` | partly current | Preserve; reconcile language with `PRODUCT_PHILOSOPHY.md`. |
| `docs/bible/01-foundation/02-core-principles.md` | partly current | Preserve; reconcile with Constitution. |
| `docs/bible/02-platform-architecture.md` | partly current | Mark future vision where needed. |
| `docs/bible/03-database-design.md` | needs audit | Compare with `supabase/schema.sql` and migrations. |
| `docs/bible/04-modules-architecture.md` | needs audit | Compare with Sport-first current implementation. |
| `docs/bible/05-product-requirements.md` | draft | Split into MVP 1.0 and 1.1 requirements. |
| `docs/bible/06-ux-interaction-guidelines.md` | draft | Reconcile with Telegram Mini App UX and current UI. |

## Missing sections for Bible 1.0

- MVP 1.0 scope.
- Olomouc closed beta scope.
- Browser Demo Mode scope and limits.
- Telegram Mini App constraints.
- Event creation and join lifecycle.
- Activity Chat shipped behavior.
- Share and `/join/:id` shipped behavior.
- Weather Widget shipped behavior.
- Profile shipped behavior.
- Supabase trusted auth current status.
- QA / beta release gates.
- Known non-goals for 1.0.

## Missing sections for Bible 1.1+

- Sport Coach MVP boundaries.
- Coach request lifecycle.
- Coach reviews and trust model.
- Future moderation model.
- Future notification model.
- Future recommendation engine.
- Future AI event discovery.
- Future multi-vertical platform model.
- Future admin surface.

## Known conflicts to resolve

| Conflict | Files to compare | Required decision |
|---|---|---|
| Current trusted auth vs release blocker wording. | `README.md`, `RELEASE_NOTES.md`, `docs/Security.md`, `src/authSession.ts` | Decide exact current status and sync wording. |
| Sport Coach scope vs current UI. | `docs/SPORT_COACH_MVP.md`, `src/components/CoachRequestPanel.tsx`, `src/verticals/SportVertical.tsx` | Split shipped behavior from planned 1.1/1.2. |
| Chat lifecycle vs future moderation/retention. | `README.md`, `BACKLOG.md`, `docs/Moderation.md`, `src/components/ActivityChatPanel.tsx` | Mark future behavior explicitly. |
| Broad vertical platform vs Sport-first beta. | `ROADMAP.md`, `docs/vertical-experiences.md`, `src/types.ts`, `src/verticals/*` | Keep architecture, but label future scope. |
| Historical Netlify references vs Vercel deploy. | `SPRINT0_STATUS.md`, `DEPLOYMENT.md`, `BETA_CHECKLIST.md` | Mark Sprint 0 as historical and Vercel as current. |
| Generated snapshots vs current docs. | `GO_IRL_DOCUMENTATION.md`, `PATCH_REPORT.md`, `project-audit/*` | Keep snapshots, but do not treat them as operational truth. |

## Deprecated / historical decisions already made

| File | Decision |
|---|---|
| `SETUP.md` | Deprecated; keep historical. |
| `SETUP_RU.md` | Deprecated; keep historical. |
| `PATCH_REPORT.md` | Historical patch snapshot; keep until merged into current docs. |
| `GO_IRL_DOCUMENTATION.md` | Generated snapshot; archive candidate. |
| `CHECKLIST.md` | Historical/local audit checklist; verify before use. |
| `SPRINT0_STATUS.md` | Historical Sprint 0 snapshot. |

## Proposed final documentation structure

```text
Core:
  README.md
  DOCS_INDEX.md
  ROADMAP.md
  BACKLOG.md
  CHANGELOG.md
  RELEASE_NOTES.md

Product:
  docs/PRODUCT_PHILOSOPHY.md
  docs/GO_IRL_CONSTITUTION.md
  docs/MVP_STABILIZATION_PLAN.md
  docs/GO_IRL_1_1_STABILIZATION.md
  docs/DEVELOPMENT_PROTOCOL.md
  docs/SPORT_COACH_MVP.md

Architecture:
  docs/Database.md
  docs/RLS.md
  docs/Security.md
  docs/Admin.md
  docs/Moderation.md
  docs/EventLifecycle.md
  docs/UserLifecycle.md
  docs/Notifications.md
  docs/AI.md
  docs/performance.md
  docs/vertical-experiences.md

Bible:
  docs/bible/*

QA / Beta:
  BETA_CHECKLIST.md
  BETA_TESTING.md
  DEPLOYMENT.md
  SPRINTS.md
  SPRINT0_STATUS.md
  project-audit/*

Archive / Deprecated:
  SETUP.md
  SETUP_RU.md
  GO_IRL_DOCUMENTATION.md
  PATCH_REPORT.md
  old snapshots
```

## Minimal commit plan

1. Update `DOCS_INDEX.md` with registry, source-of-truth map, conflicts, Bible status.
2. Add deprecated banners to `SETUP.md` and `SETUP_RU.md`.
3. Add snapshot banner to `PATCH_REPORT.md`.
4. Add this `docs/DOCUMENTATION_AUDIT.md` as the working audit report.
5. Update Bible completion docs with missing sections and 1.0 / 1.1 split.
6. Sync `README.md`, `RELEASE_NOTES.md`, and `docs/Security.md` wording around trusted auth status.
7. Sync `docs/SPORT_COACH_MVP.md` with current MVP vs planned 1.1 / 1.2.
8. Update `project-audit/GO_IRL_PROJECT_AUDIT.md` with documentation cleanup results.

## Risks

- Documentation can claim current behavior that code does not implement.
- Bible can look complete because it is structured, but content is still incomplete.
- Historical snapshots can mislead future work if not marked clearly.
- Supabase docs can accidentally imply SQL/RLS changes that were not applied.
- Release docs can drift from actual Vercel / Telegram / Supabase state.

## Next task

Update Bible completion files:

- `docs/bible/00-completion-audit.md`
- `docs/bible/00-bible-roadmap.md`

Goal: mark Bible as incomplete, split App 1.0 vs 1.1+ missing sections, and prevent future vision from being treated as current MVP scope.
