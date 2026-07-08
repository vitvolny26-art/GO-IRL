# GO IRL Documentation Status Registry

Single entry point for GO IRL documentation status, ownership, and conflict tracking.

Use this file before changing product logic, architecture, QA flow, beta scope, release wording, or historical product philosophy.

## Absolute source-of-truth rules

- `docs/GO_IRL_CONSTITUTION.md` is the **absolute source of truth** for GO IRL philosophy and architecture principles.
- `docs/MARKET_POSITIONING.md` is the **source of truth for market positioning and MVP feature filtering**.
- `docs/COMPETITOR_WATCH.md` is the **source of truth for competitor signals**, but competitor signals must not automatically become MVP scope.
- `README.md` is the **source of truth for the current code scope**: implemented features, stack, setup, and current runtime model.
- `RELEASE_NOTES.md` is the source of truth for release state and must not contradict `README.md`.
- `docs/SPORT_COACH_MVP.md` is the source of truth for Sport Coach MVP 1.1 boundaries after this cleanup.
- `docs/MVP_DOC_AUDIT.md` is the source of truth for known documentation conflicts.
- `docs/MISSING_SECTIONS.md` is the source of truth for missing documentation boundaries.
- Historical snapshot files must not be used for code generation.
- Bible files are preserved historical/product sources. They must not override current beta scope, market positioning, code, Supabase schema, auth, or RLS.
- Do not change `.env`, secrets, Supabase RLS, auth, or destructive SQL without explicit approval.

## Статусный реестр документации

| Документ | Тип | Статус (Current/Draft/Deprecated) | Source of Truth (Да/Нет) | Известные конфликты |
|---|---|---|---|---|
| `README.md` | Core / Code Scope | Current | Да | Must stay aligned with `RELEASE_NOTES.md` on Trusted Auth and release blockers. |
| `DOCS_INDEX.md` | Registry | Current | Да | Must be updated after every doc move/status change. |
| `ROADMAP.md` | Product Planning | Current | Да | Synced with market guardrails; broad platform work remains future. |
| `BACKLOG.md` | Product Planning | Draft | Нет | Synced with beta filter; future items must remain tagged. |
| `CHANGELOG.md` | Release History | Draft | Нет | Tracks docs-only guardrail updates; latest quality gates still pending. |
| `RELEASE_NOTES.md` | Release Status | Current | Да | Trusted Auth was synced as `[SHIPPED/PRODUCTION PATH]`; operational smoke checks remain. |
| `BETA_CHECKLIST.md` | QA / Beta | Current | Да | Needs sync after release/deployment wording changes. |
| `BETA_TESTING.md` | QA / Beta | Current | Да | Browser Demo Mode needs fuller boundaries. |
| `DEPLOYMENT.md` | Release / Deploy | Current | Да | Must remain Vercel-first; old Netlify references are historical only. |
| `SPRINTS.md` | Planning History | Draft | Нет | Sprint plan must follow current `ROADMAP.md`. |
| `SPRINT0_STATUS.md` | Historical Snapshot | Deprecated | Нет | Contains Netlify-era proof; not current Vercel release truth. |
| `CHECKLIST.md` | Historical Local Checklist | Deprecated | Нет | Old local branch/Docker/Prisma/Turbo assumptions; do not generate code from it. |
| `SETUP.md` | Legacy Setup | Deprecated | Нет | Old Windows paths and `.bat` / `.ps1` workflow. |
| `SETUP_RU.md` | Legacy Setup | Deprecated | Нет | Old Windows paths and `.bat` / `.ps1` workflow. |
| `PATCH_REPORT.md` | Historical Patch Report | Deprecated | Нет | Trusted Auth implementation history, not current release truth. |
| `GO_IRL_DOCUMENTATION.md` | Generated Snapshot | Deprecated | Нет | Old generated snapshot; may contain outdated README/Roadmap excerpts. |
| `docs/PRODUCT_PHILOSOPHY.md` | Product Philosophy | Current | Нет | Protected from rewrite; Constitution and Market Positioning are higher operational filters. |
| `docs/GO_IRL_CONSTITUTION.md` | Product / Architecture Constitution | Current | Да | Absolute philosophy and architecture source of truth. |
| `docs/MARKET_POSITIONING.md` | Market / Feature Filter | Current | Да | Must gate new feature categories before MVP expansion. |
| `docs/COMPETITOR_WATCH.md` | Market Watch | Current | Да | Competitor signals must not auto-create MVP scope. |
| `docs/GO_IRL_1_1_STABILIZATION.md` | Stabilization Ledger | Draft | Нет | Task statuses may become historical. |
| `docs/MVP_STABILIZATION_PLAN.md` | MVP Plan | Current | Да | Needs missing sections for demo/chat/weather boundaries. |
| `docs/DEVELOPMENT_PROTOCOL.md` | Engineering Protocol | Current | Да | Must remain aligned with project rules: pnpm, small patches, no unsafe changes. |
| `docs/SPORT_COACH_MVP.md` | Product Scope / Coach | Current | Да | Synced: `CoachRequestPanel.tsx` is current UI basis; Role Choice and Review Flow are future. |
| `docs/MVP_DOC_AUDIT.md` | Audit / Conflict Registry | Current | Да | New registry for doc conflicts and resolutions. |
| `docs/MISSING_SECTIONS.md` | Audit / Missing Boundaries | Current | Да | New registry for undocumented MVP boundaries. |
| `docs/DOCUMENTATION_AUDIT.md` | Audit | Current | Нет | Refreshed with market layer and Bible guardrail tasks. |
| `docs/Database.md` | Architecture | Draft | Нет | Needs audit against `supabase/schema.sql` and migrations. |
| `docs/RLS.md` | Supabase / RLS | Draft | Нет | Do not edit policies without explicit approval. |
| `docs/Security.md` | Security | Draft | Нет | Must stay aligned with Trusted Auth production path. |
| `docs/Admin.md` | Architecture / Admin | Draft | Нет | Mostly future/admin tooling scope. |
| `docs/Moderation.md` | Architecture / Moderation | Draft | Нет | Mostly future scope. |
| `docs/privacy.md` | Product / Privacy | Draft | Нет | Needs sync with chat retention and auth reality. |
| `docs/EventLifecycle.md` | Architecture | Draft | Нет | Needs Activity Chat and 24-hour boundary section. |
| `docs/UserLifecycle.md` | Architecture | Draft | Нет | Broader than current MVP. |
| `docs/Notifications.md` | Architecture / Notifications | Draft | Нет | Advanced notification automation is future scope. |
| `docs/n8n-workflows.md` | Automation / Future | Draft | Нет | Future automation only; not MVP core logic. |
| `docs/AI.md` | AI / Future | Draft | Нет | AI discovery is not current MVP. |
| `docs/ai-event-discovery.md` | AI / Future | Draft | Нет | Future pipeline only. |
| `docs/RecommendationEngine.md` | Architecture / Future | Draft | Нет | v2 recommendation concepts, not current MVP proof. |
| `docs/reputation.md` | Reputation / Future | Draft | Нет | RLI/Trust future model, not current complete runtime. |
| `docs/vertical-experiences.md` | Product / Future Architecture | Draft | Нет | Current MVP is Olomouc-first with six beta categories; broad verticals are future-compatible architecture. |
| `docs/performance.md` | Architecture | Current | Нет | Keep aligned with bundle and vertical loading strategy. |
| `docs/bible/00-completion-audit.md` | Bible Audit | Current | Да | Bible is preserved and structured, not complete; now includes market-scope reconciliation. |
| `docs/bible/00-bible-roadmap.md` | Bible Roadmap | Current | Да | Defines how to finish Bible without rewriting from scratch; now includes market-scope guardrails. |
| `docs/bible/01-foundation/01-why-we-exist.md` | Bible | Draft | Нет | Preserved philosophy; broad platform language is future vision, not beta scope. |
| `docs/bible/01-foundation/02-core-principles.md` | Bible | Draft | Нет | Preserved principles; API/backend/RLI/AI language is future direction, not beta refactor mandate. |
| `docs/bible/02-platform-architecture.md` | Bible | Draft | Нет | Marked as future platform vision; not an instruction to build large backend/API/workers before beta. |
| `docs/bible/03-database-design.md` | Bible | Draft | Нет | Marked as future database vision; not current Supabase schema or migration plan. |
| `docs/bible/04-modules-architecture.md` | Bible | Draft | Нет | Marked as future module vision; broad modules and AI are not current MVP. |
| `docs/bible/05-product-requirements.md` | Bible / PRD | Draft | Нет | Marked as historical PRD draft; RLI/reminders/reviews/achievements are future unless re-approved. |
| `docs/bible/06-ux-interaction-guidelines.md` | Bible / UX | Draft | Нет | Marked as UX principles draft; achievements/AI/verification are future unless re-approved. |
| `project-audit/GO_IRL_DOCUMENTATION_CLEANUP_AUDIT.md` | Audit | Current | Нет | Historical audit context; not code source of truth. |
| `project-audit/GO_IRL_PROJECT_AUDIT.md` | Audit | Draft | Нет | Needs refresh after docs sanitation. |
| `project-audit/GO_IRL_PROJECT_AUDIT.json` | Snapshot | Deprecated | Нет | Keep only if scripts consume it. |
| `project-audit/GO_IRL_HEALTH_AUDIT.md` | Audit | Draft | Нет | Regenerate when lint/build/test status changes. |
| `project-audit/TASK1_COACH_CHAT_WEATHER_AUDIT.md` | Task Audit | Deprecated | Нет | Historical task context only. |
| `project-audit/BETA_READINESS_AUDIT.md` | QA Audit | Draft | Нет | Needs sync with current release notes. |
| `project-audit/STABILIZATION_BOOTSTRAP_REPORT.md` | Snapshot | Deprecated | Нет | Archive candidate. |
| `supabase/README.md` | Supabase Setup | Current | Да | Must reflect Trusted Auth and current migration reality. |
| `supabase/schema.sql` | Supabase Schema | Current | Да | Production-sensitive. Read-only during documentation cleanup. |
| `supabase/schema_next.sql` | Future Schema | Draft | Нет | Do not apply without review. |
| `supabase/migrations/*` | Supabase Migration History | Current | Да | Read-only for this task. No destructive SQL. |

## Current documentation conflicts

| Conflict | Files | Resolution |
|---|---|---|
| Trusted Auth was both current production model and public blocker. | `README.md`, `RELEASE_NOTES.md`, `PATCH_REPORT.md` | `RELEASE_NOTES.md` now marks Trusted Auth as `[SHIPPED/PRODUCTION PATH]`; operational checks remain. |
| Coach UI promise exceeded current implementation. | `docs/SPORT_COACH_MVP.md`, `src/components/CoachRequestPanel.tsx` | Added factual UI section; Role Choice and Review Flow moved to `[FUTURE VISION 1.2+]`. |
| Sprint 0 Netlify proof conflicted with current Vercel beta flow. | `SPRINT0_STATUS.md`, `DEPLOYMENT.md`, `BETA_CHECKLIST.md` | `SPRINT0_STATUS.md` marked historical/deprecated. |
| Legacy setup docs could mislead AI/code generation. | `SETUP.md`, `SETUP_RU.md`, `CHECKLIST.md` | Added historical/deprecated warning banners. |
| Generated snapshots could be mistaken for current docs. | `GO_IRL_DOCUMENTATION.md`, `PATCH_REPORT.md` | Added warning banners and status registry entries. |
| Activity Chat, Browser Demo Mode, Weather, Telegram Mini App limits are not fully centralized. | `docs/MISSING_SECTIONS.md` | Missing-section registry created. |
| Bible files could be mistaken for current MVP, Supabase schema, or implementation plan. | `docs/bible/*`, `ROADMAP.md`, `BACKLOG.md`, `docs/MARKET_POSITIONING.md` | Added guardrail banners and synced Bible audit/roadmap with market scope. |

## Current tree

```text
GO IRL Documentation
├── Core
│   ├── README.md
│   ├── DOCS_INDEX.md
│   ├── ROADMAP.md
│   ├── BACKLOG.md
│   ├── CHANGELOG.md
│   └── RELEASE_NOTES.md
│
├── Product / Market
│   └── docs/
│       ├── PRODUCT_PHILOSOPHY.md
│       ├── GO_IRL_CONSTITUTION.md
│       ├── MARKET_POSITIONING.md
│       ├── COMPETITOR_WATCH.md
│       ├── MVP_STABILIZATION_PLAN.md
│       ├── GO_IRL_1_1_STABILIZATION.md
│       ├── DEVELOPMENT_PROTOCOL.md
│       └── SPORT_COACH_MVP.md
│
├── Architecture
│   └── docs/
│       ├── Database.md
│       ├── RLS.md
│       ├── Security.md
│       ├── Admin.md
│       ├── Moderation.md
│       ├── privacy.md
│       ├── EventLifecycle.md
│       ├── UserLifecycle.md
│       ├── Notifications.md
│       ├── n8n-workflows.md
│       ├── AI.md
│       ├── ai-event-discovery.md
│       ├── RecommendationEngine.md
│       ├── reputation.md
│       ├── vertical-experiences.md
│       └── performance.md
│
├── Audit
│   ├── docs/MVP_DOC_AUDIT.md
│   ├── docs/MISSING_SECTIONS.md
│   ├── docs/DOCUMENTATION_AUDIT.md
│   └── project-audit/
│
├── Bible
│   └── docs/bible/
│       ├── 00-completion-audit.md
│       ├── 00-bible-roadmap.md
│       ├── 01-foundation/
│       │   ├── 01-why-we-exist.md
│       │   └── 02-core-principles.md
│       ├── 02-platform-architecture.md
│       ├── 03-database-design.md
│       ├── 04-modules-architecture.md
│       ├── 05-product-requirements.md
│       └── 06-ux-interaction-guidelines.md
│
├── QA / Beta / Release
│   ├── BETA_CHECKLIST.md
│   ├── BETA_TESTING.md
│   ├── CHECKLIST.md
│   ├── DEPLOYMENT.md
│   ├── SPRINT0_STATUS.md
│   ├── SPRINTS.md
│   └── beta-test.cjs
│
├── Supabase
│   └── supabase/
│       ├── README.md
│       ├── schema.sql
│       ├── schema_next.sql
│       └── migrations/
│
└── Deprecated / Snapshot Candidates
    ├── SETUP.md
    ├── SETUP_RU.md
    ├── PATCH_REPORT.md
    └── GO_IRL_DOCUMENTATION.md
```

## Maintenance rule

Update this registry when:

- a document is added, moved, deprecated, or promoted to source of truth;
- release blockers change;
- future vision becomes MVP scope;
- code implementation contradicts docs;
- Bible files are audited or reclassified;
- Supabase migration/auth/RLS docs are audited.
