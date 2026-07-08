# GO IRL Documentation Index

Single entry point for GO IRL project documentation.

Use this file before changing product logic, architecture, QA flow, beta scope, or historical product philosophy.

## Rules

- `docs/GO_IRL_CONSTITUTION.md` is the product and architecture source of truth.
- Product philosophy and Bible files are preserved historical/product sources. Do not delete, overwrite, or rewrite them during code refactors.
- Prefer current operational docs for daily development: `README.md`, `ROADMAP.md`, `docs/DEVELOPMENT_PROTOCOL.md`, `docs/MVP_STABILIZATION_PLAN.md`, and `BETA_TESTING.md`.
- Historical reports and snapshots may be archived later, but only after their useful content is copied into current docs.
- Do not change `.env`, secrets, Supabase RLS, auth, or destructive SQL without explicit approval.

## Tree

```text
GO IRL Documentation
├── Core
│   ├── README.md
│   ├── ROADMAP.md
│   ├── BACKLOG.md
│   ├── CHANGELOG.md
│   ├── RELEASE_NOTES.md
│   └── DOCS_INDEX.md
│
├── QA / Beta / Release
│   ├── BETA_CHECKLIST.md
│   ├── BETA_TESTING.md
│   ├── CHECKLIST.md
│   ├── DEPLOYMENT.md
│   ├── SPRINT0_STATUS.md
│   ├── SPRINTS.md
│   ├── beta-test.cjs
│   └── project-audit/
│       ├── GO_IRL_PROJECT_AUDIT.md
│       ├── GO_IRL_PROJECT_AUDIT.json
│       ├── GO_IRL_HEALTH_AUDIT.md
│       ├── TASK1_COACH_CHAT_WEATHER_AUDIT.md
│       ├── BETA_READINESS_AUDIT.md
│       └── STABILIZATION_BOOTSTRAP_REPORT.md
│
├── Architecture / Product / Platform
│   ├── docs/
│   │   ├── PRODUCT_PHILOSOPHY.md
│   │   ├── GO_IRL_CONSTITUTION.md
│   │   ├── GO_IRL_1_1_STABILIZATION.md
│   │   ├── MVP_STABILIZATION_PLAN.md
│   │   ├── DEVELOPMENT_PROTOCOL.md
│   │   ├── SPORT_COACH_MVP.md
│   │   ├── Database.md
│   │   ├── RLS.md
│   │   ├── Security.md
│   │   ├── Admin.md
│   │   ├── Moderation.md
│   │   ├── privacy.md
│   │   ├── EventLifecycle.md
│   │   ├── UserLifecycle.md
│   │   ├── Notifications.md
│   │   ├── n8n-workflows.md
│   │   ├── AI.md
│   │   ├── ai-event-discovery.md
│   │   ├── RecommendationEngine.md
│   │   ├── reputation.md
│   │   ├── vertical-experiences.md
│   │   └── performance.md
│   └── supabase/
│       ├── README.md
│       ├── schema.sql
│       ├── schema_next.sql
│       └── migration_*.sql
│
├── History / Bible / Product Philosophy Archive
│   └── docs/bible/
│       ├── 01-foundation/
│       │   ├── 01-why-we-exist.md
│       │   └── 02-core-principles.md
│       ├── 02-platform-architecture.md
│       ├── 03-database-design.md
│       ├── 04-modules-architecture.md
│       ├── 05-product-requirements.md
│       └── 06-ux-interaction-guidelines.md
│
└── Deprecated / Snapshot Candidates
    ├── [DEPRECATED] SETUP.md
    ├── [DEPRECATED] SETUP_RU.md
    ├── PATCH_REPORT.md
    └── GO_IRL_DOCUMENTATION.md
```

## Core

### `README.md`
Main project entry point. Contains stack, setup, verification commands, implemented scope, and links to current docs.

### `ROADMAP.md`
Current product and engineering direction. Use it to decide what to build next. The current beta priority is stabilization and Sport Coach MVP 1.1, not broad feature expansion.

### `BACKLOG.md`
Confirmed work queue and known blockers. Use for task prioritization after roadmap-level direction is clear.

### `CHANGELOG.md`
Confirmed shipped changes. Update after meaningful completed work.

### `RELEASE_NOTES.md`
Release-facing notes and launch blockers. Use before beta/public deployment checks.

### `DOCS_INDEX.md`
This file. Documentation map and archival policy.

## QA / Beta / Release

### `BETA_CHECKLIST.md`
Manual beta readiness checklist. Covers Vercel deployment, Telegram bot configuration, iOS/Android share and join links, browser demo mode, and manual device checks.

### `BETA_TESTING.md`
Quick beta testing workflow. Includes `node beta-test.cjs`, local dev server, demo mode, mobile share test, Vercel check, and Supabase verification.

### `CHECKLIST.md`
Large local audit checklist. Review before relying on it: parts may reference older local branch assumptions and broader audit steps.

### `DEPLOYMENT.md`
Deployment and smoke-test checklist. Use before Vercel/Telegram/Supabase release verification.

### `SPRINT0_STATUS.md`
Historical Sprint 0 production verification status. Keep for release history.

### `SPRINTS.md`
Sprint-by-sprint delivery plan. Keep synchronized with `ROADMAP.md` when sprint priorities change.

### `beta-test.cjs`
Local beta helper script, not documentation. Keep referenced from `BETA_TESTING.md` and `BETA_CHECKLIST.md`.

### `project-audit/GO_IRL_PROJECT_AUDIT.md`
Project-level audit. Update after major stabilization stages.

### `project-audit/GO_IRL_PROJECT_AUDIT.json`
Machine-readable audit snapshot. Keep if scripts consume it; otherwise archive later.

### `project-audit/GO_IRL_HEALTH_AUDIT.md`
Generated health audit. Must be regenerated when lint/build/test status changes.

### `project-audit/TASK1_COACH_CHAT_WEATHER_AUDIT.md`
Task-specific audit for Coach, Activity Chat, and Weather. Keep as implementation context.

### `project-audit/BETA_READINESS_AUDIT.md`
Beta readiness audit. Keep as release-gate evidence and synchronize with `BETA_CHECKLIST.md`, `BETA_TESTING.md`, and `RELEASE_NOTES.md`.

### `project-audit/STABILIZATION_BOOTSTRAP_REPORT.md`
Historical stabilization bootstrap report. Candidate for archival after core findings are merged into `GO_IRL_PROJECT_AUDIT.md`.

## Architecture / Product / Platform

### `docs/PRODUCT_PHILOSOPHY.md`
Product manifesto and mission. Protect from accidental rewrite.

### `docs/GO_IRL_CONSTITUTION.md`
Primary source of truth for product and architecture decisions.

### `docs/GO_IRL_1_1_STABILIZATION.md`
GO IRL 1.1 stabilization scope. Must be included in future stabilization planning.

### `docs/MVP_STABILIZATION_PLAN.md`
Closed beta stabilization plan. Use for current MVP readiness work.

### `docs/DEVELOPMENT_PROTOCOL.md`
Development rules: analyze usages first, patch one feature at a time, use pnpm, run lint/build/test, no force push, no secret/RLS/destructive SQL changes without approval.

### `docs/SPORT_COACH_MVP.md`
Sport Coach MVP 1.1 scope. Coach is sport-only. Universal roles are deferred.

### `docs/Database.md`
Target database architecture.

### `docs/RLS.md`
Supabase RLS design. Do not modify policies without explicit approval and verification.

### `docs/Security.md`
Security model, trusted auth, roles, permissions, abuse, and audit strategy.

### `docs/Admin.md`
Admin roles, permissions, and future admin surfaces.

### `docs/Moderation.md`
Reporting, blocking, moderation hold, and audit architecture.

### `docs/privacy.md`
Privacy-first product architecture.

### `docs/EventLifecycle.md`
Activity lifecycle from creation to archive.

### `docs/UserLifecycle.md`
User lifecycle from registration to deletion.

### `docs/Notifications.md`
Notification preferences, evening digest, chat notifications, quiet hours, and no Mini App background work.

### `docs/n8n-workflows.md`
Future n8n workflow architecture. n8n is automation, not core business logic.

### `docs/AI.md`
AI platform, discovery, normalization, duplicate detection, and privacy guardrails.

### `docs/ai-event-discovery.md`
AI event discovery pipeline plan.

### `docs/RecommendationEngine.md`
Recommendation engine v2 architecture.

### `docs/reputation.md`
RLI, Trust Score, Community Contribution, attendance confirmation, and reputation privacy.

### `docs/vertical-experiences.md`
Vertical module architecture for Sport, Dating, Friends, Food, Travel, Culture, and generic fallback.

### `docs/performance.md`
Code splitting, bundle strategy, and vertical loading rules.

### `supabase/README.md`
Supabase setup, migrations, RLS, environment variables, Edge Functions, and verification guide.

### `supabase/schema.sql`
Current main Supabase schema. Treat as production-sensitive.

### `supabase/schema_next.sql`
Future/next schema draft. Verify before applying anywhere.

### `supabase/migration_*.sql`
Database migrations. Apply only through an approved, reviewed process. No destructive SQL without explicit approval.

## History / Bible / Product Philosophy Archive

Bible documents are product-philosophy and long-form architecture sources. They may overlap with newer `docs/` files, but they should not be deleted or overwritten by routine refactors.

The old root-level Bible filenames were intentionally renamed and moved into `docs/bible/` to remove naming noise and make the archive safe to navigate.

### Preservation rule

- Do not delete or rewrite Bible files during code cleanup.
- If a Bible file conflicts with current implementation, update current operational docs first and note the conflict.
- If consolidation is needed, copy the stable principle into `docs/PRODUCT_PHILOSOPHY.md` or `docs/GO_IRL_CONSTITUTION.md`, then keep the original as historical source.

### Current Bible structure

| Order | File | Source status |
|---|---|---|
| 01.01 | `docs/bible/01-foundation/01-why-we-exist.md` | Complete chapter: Why We Exist. |
| 01.02 | `docs/bible/01-foundation/02-core-principles.md` | Complete chapter: 22 principles plus Engineering Oath. |
| 02 | `docs/bible/02-platform-architecture.md` | Complete book-level architecture document. |
| 03 | `docs/bible/03-database-design.md` | Complete database design document, but contains a leftover Russian sentence at the end. |
| 04 | `docs/bible/04-modules-architecture.md` | Complete modules architecture document. |
| 05 | `docs/bible/05-product-requirements.md` | Complete PRD document. Original heading did not include chapter number 06. |
| 06 | `docs/bible/06-ux-interaction-guidelines.md` | Complete UX guidelines document. Original heading used `07`, so numbering was inconsistent. |

### Bible completeness audit

Current Bible archive is usable and preserved, but not perfectly complete as a numbered book series.

Known gaps and inconsistencies:

- Book I has Chapter 1 and Chapter 2.
- Book II is a book-level document and does not explicitly say Chapter 3.
- Book III starts as `04 — Database Design`.
- Book IV starts as `05 — Modules Architecture`.
- Book V has PRD content but no explicit `06` in the original heading.
- Book VI starts as `07 — UX & Interaction Guidelines`.
- This suggests the historical material contains chapters 1, 2, 4, 5, 7, with `3` implicit in Book II and `6` implicit/missing in Book V.

Do not invent missing Bible chapters without a product decision. If needed, create a separate future file such as `docs/bible/00-bible-roadmap.md` to define missing chapter titles before writing them.

### Old root filenames replaced

- `Chapter 1 Why We Exist` -> `docs/bible/01-foundation/01-why-we-exist.md`
- `GO IRL Bible Book I — Foundation Chapter 2 Core Principles` -> `docs/bible/01-foundation/02-core-principles.md`
- `GO IRL Bible Book II Platform Architecture` -> `docs/bible/02-platform-architecture.md`
- `Book III  ## 04 — Database Design` -> `docs/bible/03-database-design.md`
- `Book IV — Modules  ### 05 — Modules Architecture` -> `docs/bible/04-modules-architecture.md`
- `Book V  ## Product Requirements Document (PRD)` -> `docs/bible/05-product-requirements.md`
- `Book VI  ## 07 — UX & Interaction Guidelines` -> `docs/bible/06-ux-interaction-guidelines.md`

## Deprecated / Snapshot Candidates

### `[DEPRECATED] SETUP.md`
Reason: contains local Windows-specific paths and manual desktop setup assumptions.

Safe replacement:

```bash
pnpm install
pnpm run dev
```

For current workflow, use Codespaces terminal and `docs/DEVELOPMENT_PROTOCOL.md`.

### `[DEPRECATED] SETUP_RU.md`
Reason: likely mirrors old local Windows setup. Verify before use.

Safe replacement:

```bash
pnpm install
pnpm run dev
```

For Russian workflow, prefer this project protocol:

```bash
pnpm run lint
pnpm run build
pnpm run test
```

### `PATCH_REPORT.md`
Patch snapshot for trusted auth guard work. Keep temporarily. Archive after its remaining action items are reflected in `RELEASE_NOTES.md`, `docs/Security.md`, and `supabase/README.md`.

### `GO_IRL_DOCUMENTATION.md`
Large generated snapshot. Keep temporarily. Archive after useful content is merged into `DOCS_INDEX.md`, `README.md`, `ROADMAP.md`, and `project-audit/GO_IRL_PROJECT_AUDIT.md`.

## Safe current setup

Use this for Codespaces and current development:

```bash
pnpm install
pnpm run dev
```

Before commit:

```bash
pnpm run lint
pnpm run build
pnpm run test
```

Do not use `npm`. Do not commit `package-lock.json`, `node_modules`, `dist`, or backup files.

## Maintenance

Update this index when:

- a new documentation file is added;
- a root-level historical document is archived;
- `docs/` gets a new architecture file;
- beta workflow changes;
- release blockers move between `ROADMAP.md`, `BACKLOG.md`, and `RELEASE_NOTES.md`.
