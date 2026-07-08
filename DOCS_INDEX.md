# GO IRL Documentation Index

Single entry point for GO IRL project documentation.

Use this file before changing product logic, architecture, QA flow, beta scope, or historical product philosophy.

## Rules

- `docs/GO_IRL_CONSTITUTION.md` is the product and architecture source of truth.
- `docs/MARKET_POSITIONING.md` is the market positioning source of truth and MVP feature filter.
- `docs/COMPETITOR_WATCH.md` tracks competitor signals and what GO IRL should or should not borrow.
- Product philosophy and Bible files are preserved historical/product sources. Do not delete, overwrite, or rewrite them during code refactors.
- Prefer current operational docs for daily development: `README.md`, `ROADMAP.md`, `docs/DEVELOPMENT_PROTOCOL.md`, `docs/MVP_STABILIZATION_PLAN.md`, and `BETA_TESTING.md`.
- Historical reports and snapshots may be archived later, but only after their useful content is copied into current docs.
- Do not change `.env`, secrets, Supabase RLS, auth, or destructive SQL without explicit approval.
- Future vision must be marked as future scope and must not be presented as current MVP behavior.

## Source of truth map

| Area | Source of truth | Notes |
|---|---|---|
| Product and architecture principles | `docs/GO_IRL_CONSTITUTION.md` | Primary decision document. |
| Market positioning and MVP feature filter | `docs/MARKET_POSITIONING.md` | Defines who GO IRL is, who it is not, beta categories, and forbidden MVP complexity. |
| Competitor monitoring | `docs/COMPETITOR_WATCH.md` | Tracks competitors, product signals, and feature import queue. |
| Current app entry point | `README.md` | Stack, setup, implemented scope, trusted auth status. |
| Current priorities | `ROADMAP.md` | Stabilization, beta readiness, Sport Coach 1.1. |
| Confirmed task queue | `BACKLOG.md` | Deferred and known work. |
| Development protocol | `docs/DEVELOPMENT_PROTOCOL.md` | pnpm, one task at a time, no unsafe changes. |
| Closed beta workflow | `BETA_TESTING.md`, `BETA_CHECKLIST.md` | Manual and helper-based beta checks. |
| Release status | `RELEASE_NOTES.md` | Must stay synchronized with `README.md` and `supabase/README.md`. |
| Deployment status | `DEPLOYMENT.md` | Vercel is the current primary deployment target. |
| Supabase setup | `supabase/README.md` | Must reflect current migrations and trusted auth reality. |
| Documentation audit | `docs/DOCUMENTATION_AUDIT.md`, `project-audit/GO_IRL_DOCUMENTATION_CLEANUP_AUDIT.md` | Current documentation cleanup record. |
| Bible completion | `docs/bible/00-completion-audit.md`, `docs/bible/00-bible-roadmap.md` | Bible is preserved and structured, but not complete. |

## Documentation status registry

| Document | Type | Status | Useful content | Known issue / conflict | Action |
|---|---|---|---|---|---|
| `README.md` | Core | current | Main entry point, stack, setup, current scope, trusted auth model. | Must stay aligned with `RELEASE_NOTES.md` on trusted auth and release blockers. | Keep current. |
| `DOCS_INDEX.md` | Core | current | Documentation map, source-of-truth rules, archive policy. | Must be updated when docs move or status changes. | Keep current. |
| `ROADMAP.md` | Core / Product | current | Current direction: stabilization, Olomouc beta, Sport Coach first. | Needs clear separation of current MVP vs future platform vision. | Keep current; add scope tags when needed. |
| `BACKLOG.md` | Core / Product | partly current | Confirmed work queue and deferred ideas. | Some items are future platform scope, not current MVP. | Keep; tag future items. |
| `CHANGELOG.md` | Core | needs audit | Shipped change history. | Not fully audited in this pass. | Keep; verify before release. |
| `RELEASE_NOTES.md` | Core / Release | partly current | Release-facing status and blockers. | Trusted auth wording was clarified; still needs live production verification result. | Keep synced. |
| `BETA_CHECKLIST.md` | QA / Beta | current | Manual beta readiness checklist. | Needs release-state sync after auth/release wording changes. | Keep current. |
| `BETA_TESTING.md` | QA / Beta | current | Quick beta testing workflow and helper script usage. | No major conflict found. | Keep current. |
| `CHECKLIST.md` | QA / Archive | outdated | Historical local audit checklist. | Contains older local/branch assumptions. | Mark historical or archive. |
| `DEPLOYMENT.md` | QA / Beta | current | Vercel deployment and smoke-test flow. | Netlify preserved only as historical/secondary note. | Keep current. |
| `SPRINT0_STATUS.md` | Snapshot | historical | Sprint 0 release history. | Old Netlify PASS is historical, not current deployment status. | Keep as historical snapshot. |
| `SPRINTS.md` | QA / Product | partly current | Sprint planning history. | Must follow `ROADMAP.md` when priorities change. | Keep; sync later. |
| `project-audit/GO_IRL_DOCUMENTATION_CLEANUP_AUDIT.md` | Audit | current | Documentation cleanup decisions, unresolved conflicts, verification status. | Checks not run in this environment. | Keep current. |
| `project-audit/GO_IRL_PROJECT_AUDIT.md` | Audit | partly current | Project-level audit if present in older snapshots. | Not found as current file during this pass. | Create only if needed later. |
| `project-audit/GO_IRL_PROJECT_AUDIT.json` | Snapshot | historical | Machine-readable audit snapshot if present in older snapshots. | Keep only if scripts consume it. | Archive candidate. |
| `project-audit/GO_IRL_HEALTH_AUDIT.md` | Audit | needs audit | Health status snapshot. | Shows old lint FAIL; must be regenerated when checks can run. | Keep. |
| `project-audit/TASK1_COACH_CHAT_WEATHER_AUDIT.md` | Audit | historical | Coach, chat, weather implementation context. | Task-specific snapshot, not core truth. | Keep as audit history. |
| `project-audit/BETA_READINESS_AUDIT.md` | QA / Audit | partly current | Beta release-gate evidence. | Needs sync with beta and release docs. | Keep. |
| `project-audit/STABILIZATION_BOOTSTRAP_REPORT.md` | Snapshot | historical | Bootstrap history. | Candidate for archive after useful findings are copied. | Archive candidate. |
| `docs/DOCUMENTATION_AUDIT.md` | Audit | current | Documentation-wide audit, missing sections, risks, commit plan. | Must be updated after major doc cleanup. | Keep current. |
| `docs/PRODUCT_PHILOSOPHY.md` | Product | current | Mission and manifesto. | Should not be rewritten during cleanup. | Keep. |
| `docs/GO_IRL_CONSTITUTION.md` | Product / Architecture | current | Main product and architecture principles. | Other docs must link to it consistently. | Keep as source of truth. |
| `docs/MARKET_POSITIONING.md` | Product / Market | current | Market positioning, competitive map, MVP feature filter, beta categories, expansion strategy. | Must stay aligned with roadmap before adding new feature categories. | Keep as market source of truth. |
| `docs/COMPETITOR_WATCH.md` | Product / Market | current | Competitor list, monitoring rules, feature import queue, red lines. | Weekly monitoring can update this if competitor signals change strategy. | Keep current. |
| `docs/GO_IRL_1_1_STABILIZATION.md` | Product / Snapshot | partly current | 1.1 stabilization ledger. | Task statuses can become historical. | Keep; mark snapshot sections. |
| `docs/MVP_STABILIZATION_PLAN.md` | Product | partly current | Closed beta readiness plan. | May overlap with 1.1 stabilization doc. | Keep; reconcile later. |
| `docs/DEVELOPMENT_PROTOCOL.md` | Operations | current | Development safety rules. | No major conflict found. | Keep. |
| `docs/SPORT_COACH_MVP.md` | Product | partly current | Sport-only Coach scope and 1.1/1.2 split. | Some UX appears aspirational vs current `CoachRequestPanel.tsx`. | Keep; split shipped vs planned. |
| `docs/Database.md` | Architecture | needs audit | Target database architecture. | Must be checked against `supabase/schema.sql` and migrations. | Audit later. |
| `docs/RLS.md` | Architecture / Supabase | needs audit | RLS design. | Do not change policies without explicit approval. | Audit later. |
| `docs/Security.md` | Architecture | partly current | Security model and trusted auth. | Needs live deployment verification status. | Keep synced. |
| `docs/Admin.md` | Architecture | partly current | Admin roles and surfaces. | Likely partly future-facing. | Keep with future tags. |
| `docs/Moderation.md` | Architecture | partly current | Reporting, blocking, moderation hold. | Mostly future/backlog scope. | Keep with future tags. |
| `docs/privacy.md` | Architecture / Product | partly current | Privacy-first architecture. | Needs sync with chat retention, auth, notifications. | Audit later. |
| `docs/EventLifecycle.md` | Architecture | partly current | Activity lifecycle. | Needs split between current lifecycle and future archive/moderation behavior. | Audit later. |
| `docs/UserLifecycle.md` | Architecture | partly current | User lifecycle. | Likely broader than current MVP. | Keep with scope tags. |
| `docs/Notifications.md` | Architecture | partly current | Notification preferences and quiet hours. | Notifications are not fully current MVP behavior. | Mark future where needed. |
| `docs/n8n-workflows.md` | Architecture / Future | draft | Future automation architecture. | Not current MVP. | Keep as future. |
| `docs/AI.md` | Architecture / Future | draft | AI platform ideas. | Not current MVP. | Keep as future. |
| `docs/ai-event-discovery.md` | Architecture / Future | draft | AI event discovery pipeline. | Not current MVP. | Keep as future. |
| `docs/RecommendationEngine.md` | Architecture / Future | draft | Recommendation v2 architecture. | Not current MVP. | Keep as future. |
| `docs/reputation.md` | Architecture / Future | draft | Reputation and trust model. | Not current MVP. | Keep as future. |
| `docs/vertical-experiences.md` | Product / Architecture | partly current | Vertical module architecture. | Current MVP is Sport-first; broad verticals are future vision. | Keep with future tags. |
| `docs/performance.md` | Architecture | current | Bundle and vertical loading strategy. | No major conflict found. | Keep. |
| `supabase/README.md` | Supabase | partly current | Supabase setup and verification. | Trusted auth status clarified; production verification still needed. | Keep current; no SQL changes. |
| `supabase/schema.sql` | Supabase | production-sensitive | Main schema reference. | Do not edit during docs cleanup. | Read-only for audit. |
| `supabase/schema_next.sql` | Supabase / Future | draft | Future schema draft. | Must not be applied without review. | Read-only. |
| `supabase/migrations/*` | Supabase | production-sensitive | Migration history. | No destructive SQL or RLS/auth changes without approval. | Read-only for docs audit. |
| `docs/bible/00-completion-audit.md` | Bible | current | Bible completeness audit with App 1.0 / 1.1+ split. | Needs refresh after final doc audit. | Keep. |
| `docs/bible/00-bible-roadmap.md` | Bible | current | Roadmap for completing Bible without rewrite. | Needs status update after future code/schema audits. | Keep. |
| `docs/bible/01-foundation/01-why-we-exist.md` | Bible | partly current | Mission and why GO IRL exists. | Preserved draft, not final. | Keep. |
| `docs/bible/01-foundation/02-core-principles.md` | Bible | partly current | Core principles and product oath. | Needs MVP reconciliation. | Keep. |
| `docs/bible/02-platform-architecture.md` | Bible | partly current | Platform architecture draft. | Broad future vision; needs reconciliation with current MVP. | Keep. |
| `docs/bible/03-database-design.md` | Bible | needs audit | Historical data model thinking. | Needs Supabase/schema audit; contains known leftover Russian sentence. | Keep; audit. |
| `docs/bible/04-modules-architecture.md` | Bible | needs audit | Module architecture vision. | Needs check against Sport-first focus. | Keep; audit. |
| `docs/bible/05-product-requirements.md` | Bible | draft | PRD archive. | Needs split into MVP 1.0 and 1.1 requirements. | Keep; audit. |
| `docs/bible/06-ux-interaction-guidelines.md` | Bible | draft | UX archive. | Needs Telegram Mini App UX reconciliation and numbering cleanup. | Keep; audit. |
| `SETUP.md` | Deprecated | deprecated | Legacy setup reference. | Local Windows/manual assumptions. | Do not use. |
| `SETUP_RU.md` | Deprecated | deprecated | Legacy Russian setup reference. | Mirrors old local setup. | Do not use. |
| `PATCH_REPORT.md` | Snapshot | historical | Historical trusted-auth patch context. | Not operational source of truth. | Keep as snapshot. |
| `GO_IRL_DOCUMENTATION.md` | Snapshot | historical | Large generated snapshot. | Must not be treated as current truth. Direct banner was not added to avoid unsafe full-file overwrite through API. | Archive candidate after useful content is merged. |

## Current documentation conflicts

| Conflict | Files | Decision |
|---|---|---|
| Trusted auth status can read as both implemented and blocker. | `README.md`, `RELEASE_NOTES.md`, `docs/Security.md`, `supabase/README.md` | Partly resolved: implemented in repo, still blocked for public release until deploy/secrets/v4/smoke tests. |
| Sport Coach 1.1 doc is broader than visible current UI. | `docs/SPORT_COACH_MVP.md`, `src/components/CoachRequestPanel.tsx` | Split shipped MVP behavior from planned 1.1/1.2 scope. |
| Event chat current behavior vs future retention/moderation/notifications. | `README.md`, `BACKLOG.md`, `src/components/ActivityChatPanel.tsx` | Mark advanced chat lifecycle as backlog/future. |
| Multi-vertical vision vs Sport-first MVP. | `ROADMAP.md`, `docs/vertical-experiences.md`, `docs/MARKET_POSITIONING.md`, `src/types.ts`, `src/verticals/` | Keep six beta categories and mark broad verticals as future-compatible architecture. |
| Historical Netlify references vs current Vercel beta flow. | `SPRINT0_STATUS.md`, `DEPLOYMENT.md`, `BETA_CHECKLIST.md` | Partly resolved: Vercel primary in `DEPLOYMENT.md`, Sprint 0 historical. |
| Generated snapshot docs vs current source of truth. | `GO_IRL_DOCUMENTATION.md`, `PATCH_REPORT.md`, `project-audit/*` | Partly resolved through audit docs and snapshot markers. |

## Bible status

The Bible archive is **preserved and structured, but not complete**.

Do not mark GO IRL Bible as final until these sections are completed or explicitly deferred:

- MVP 1.0 scope.
- GO IRL 1.1 scope.
- Telegram Mini App constraints.
- Browser Demo Mode.
- Olomouc beta scope.
- Market positioning and competitor boundaries.
- Supabase trusted auth reality.
- Sport Coach MVP boundaries.
- Activity Chat boundaries.
- Weather Widget boundaries.
- Share / Join flow.
- QA and release gates.

Future-only Bible material must be marked as `1.1+ / future vision`.

## Tree

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
├── Product
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
├── Documentation Audit
│   ├── docs/DOCUMENTATION_AUDIT.md
│   └── project-audit/GO_IRL_DOCUMENTATION_CLEANUP_AUDIT.md
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
│   ├── beta-test.cjs
│   └── project-audit/
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
- market positioning or competitor scope changes;
- a root-level historical document is archived;
- `docs/` gets a new architecture file;
- beta workflow changes;
- release blockers move between `ROADMAP.md`, `BACKLOG.md`, and `RELEASE_NOTES.md`;
- Bible status changes;
- Supabase migration or trusted auth documentation changes.
