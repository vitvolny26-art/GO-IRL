# GO IRL Bible Completion Roadmap

Generated: 2026-07-08
Updated: 2026-07-08

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
- `DOCS_INDEX.md` points to the structured archive.
- Historical files must not be deleted during cleanup.

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

Current classification:

| Book | File | Classification |
|---|---|---|
| Foundation | `01-foundation/01-why-we-exist.md` | partly current |
| Core principles | `01-foundation/02-core-principles.md` | partly current |
| Platform architecture | `02-platform-architecture.md` | partly current / future vision |
| Database design | `03-database-design.md` | needs schema audit |
| Modules architecture | `04-modules-architecture.md` | needs MVP audit / future vision |
| Product requirements | `05-product-requirements.md` | draft / needs 1.0 vs 1.1 split |
| UX guidelines | `06-ux-interaction-guidelines.md` | draft / needs Telegram Mini App audit |

### Step 3 — Compare with current MVP

Compare Bible content with:

```text
README.md
DOCS_INDEX.md
ROADMAP.md
BACKLOG.md
docs/DOCUMENTATION_AUDIT.md
docs/GO_IRL_1_1_STABILIZATION.md
docs/MVP_STABILIZATION_PLAN.md
docs/SPORT_COACH_MVP.md
supabase/schema.sql
supabase/migrations/*.sql
src/types.ts
src/store.ts
src/verticals/SportVertical.tsx
```

Do not modify code, SQL, RLS, auth, or migrations during this comparison.

### Step 4 — Define Bible 1.0 scope

Bible 1.0 should describe the beta-ready product, not the entire far-future platform.

Required Bible 1.0 sections:

```text
Book I — Foundation
Book II — MVP 1.0 Product Scope
Book III — Platform Architecture for current MVP
Book IV — Current Data Model and Supabase boundaries
Book V — Current Modules and Sport-first vertical logic
Book VI — Telegram Mini App UX and Interaction
Book VII — Beta Readiness and Operations
```

Bible 1.0 must explicitly cover:

- Olomouc closed beta.
- Event creation, share, join, event chat, real-life attendance loop.
- Browser Demo Mode.
- Telegram Mini App constraints.
- Supabase trusted auth current reality.
- Current QA and release gates.
- What is not included in App 1.0.

### Step 5 — Define Bible 1.1+ scope

Bible 1.1+ should describe the next layer without pretending it is already shipped.

Future / 1.1+ sections:

```text
Sport Coach MVP
Coach request lifecycle
Coach reviews and trust model
Expanded moderation
Notifications
Recommendation engine
AI event discovery
Multi-vertical platform
Admin surface
```

Every future section must be tagged as:

```text
Status: Future / 1.1+ / Not current MVP
```

### Step 6 — Write missing parts only

Do not rewrite the existing chapters unless they contradict the current project.

Missing or weak areas for 1.0:

```text
MVP 1.0 scope
Telegram Mini App constraints
Browser Demo Mode
Olomouc beta scope
Supabase trusted auth reality
Activity Chat boundaries
Weather Widget boundaries
Profile boundaries
Share/join flow
QA and release gates
```

Missing or weak areas for 1.1+:

```text
Sport Coach MVP boundaries
Coach request lifecycle
Coach reviews
Moderation
Notifications
Recommendation engine
AI event discovery
Multi-vertical platform
Admin surface
```

### Step 7 — Finalize

Only after audit and product review:

- remove draft wording;
- fix numbering;
- remove leftover mixed-language fragments;
- add explicit status blocks to future material;
- mark the set as `GO IRL Bible 1.0`.

## Immediate next audit tasks

1. Audit `03-database-design.md` against Supabase schema and migrations.
2. Audit `05-product-requirements.md` against current MVP and roadmap.
3. Audit `06-ux-interaction-guidelines.md` against Telegram Mini App UX.
4. Extract useful current content from `GO_IRL_DOCUMENTATION.md` into current docs if needed.
5. Sync `README.md`, `RELEASE_NOTES.md`, `docs/Security.md`, and `supabase/README.md` around trusted auth status.

## Do not do

- Do not invent missing chapters blindly.
- Do not make Bible the source of truth over current code without audit.
- Do not delete preserved drafts.
- Do not merge future vision into MVP scope without labeling it.
- Do not change Supabase SQL, RLS, auth, or secrets from Bible cleanup.
