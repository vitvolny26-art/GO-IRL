# GO IRL Bible Completion Roadmap

Generated: 2026-07-08

## Purpose

This file defines how to finish the GO IRL Bible without rewriting it from scratch.

Current rule: preserve existing material, classify it, compare it with the actual MVP, then complete only the missing parts.

## Search result

Repository search found these confirmed Bible files:

```text
docs/bible/01-foundation/01-why-we-exist.md
docs/bible/01-foundation/02-core-principles.md
docs/bible/02-platform-architecture.md
docs/bible/03-database-design.md
docs/bible/04-modules-architecture.md
docs/bible/05-product-requirements.md
docs/bible/06-ux-interaction-guidelines.md
```

Additional related snapshot found:

```text
GO_IRL_DOCUMENTATION.md
```

No separate final Book V, Book VI, PRD, or UX complete set was found outside the preserved Bible archive.

## Current verdict

The Bible is structured, but not finished.

Existing books are drafts with strong product value. They are not yet final GO IRL App 1.0 / 1.1 documentation.

## Completion plan

### Step 1 — Preserve

Status: done.

- Old root filenames were moved into `docs/bible/`.
- Original content was preserved.
- `DOCS_INDEX.md` now points to the structured archive.

### Step 2 — Classify

Status: started.

Each book must be marked as one of:

```text
Current
Partly current
Outdated
Future vision
Needs rewrite
Needs code/schema audit
```

### Step 3 — Compare with current MVP

Compare Bible content with:

```text
README.md
ROADMAP.md
BACKLOG.md
docs/GO_IRL_1_1_STABILIZATION.md
docs/MVP_STABILIZATION_PLAN.md
docs/SPORT_COACH_MVP.md
supabase/schema.sql
supabase/migrations/*.sql
src/types.ts
src/store.ts
src/verticals/SportVertical.tsx
```

### Step 4 — Define final Bible 1.0 scope

Bible 1.0 should describe the beta-ready product, not the entire far-future platform.

Required final books:

```text
Book I — Foundation
Book II — Product Scope
Book III — Platform Architecture
Book IV — Data Model
Book V — Modules and Verticals
Book VI — UX and Interaction
Book VII — Beta Readiness and Operations
```

### Step 5 — Write missing parts only

Do not rewrite the existing chapters unless they contradict the current project.

Missing or weak areas:

```text
MVP 1.0 scope
GO IRL 1.1 scope
Telegram Mini App constraints
Browser demo mode
Olomouc beta scope
Supabase trusted auth reality
Sport Coach MVP boundaries
Activity Chat boundaries
Weather widget boundaries
Share/join flow
QA and release gates
```

### Step 6 — Finalize

Only after audit and product review:

- remove draft wording;
- fix numbering;
- remove leftover mixed-language fragments;
- mark the set as `GO IRL Bible 1.0`.

## Immediate next audit tasks

1. Audit `03-database-design.md` against Supabase schema and migrations.
2. Audit `05-product-requirements.md` against current MVP and roadmap.
3. Audit `06-ux-interaction-guidelines.md` against Telegram Mini App UX.
4. Extract useful current content from `GO_IRL_DOCUMENTATION.md` into current docs if needed.

## Do not do

- Do not invent missing chapters blindly.
- Do not make Bible the source of truth over current code without audit.
- Do not delete preserved drafts.
- Do not merge future vision into MVP scope without labeling it.
