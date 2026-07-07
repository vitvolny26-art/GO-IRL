
# GO IRL Project Documentation

## 1. Git Status
``
?? GO_IRL_DOCUMENTATION.md
?? project-audit/

83f252a (HEAD -> main, origin/main, origin/HEAD) fix: remove broken coach and chat panels causing black screen on card open
a577f1d Add detailed weather forecasts for outdoor events
2e333e5 Improve notification system and update sharing link
ff57f0a Update project to use correct pnpm version for deployments
2df9e07 Saved progress at the end of the loop
32af3ba Merge pull request #5 from vitvolny26-art/fix/toast-feedback-v2
1ae62a0 (origin/fix/toast-feedback-v2) fix(vercel): restore root vite build
b3b1565 Merge pull request #4 from vitvolny26-art/fix/toast-feedback-v2
5aa2cbf fix(vercel): build only go irl app
766b89a (origin/fix/toast-feedback) ux: use sonner toast for notices
8003751 ux: replace custom notice with sonner toast
aa869ee ux: replace alert with toast for share
d2c8b4b fix: dynamic dev port
30ca07e feat: send feedback to supabase
673c776 ux: connect feedback form to UI
0b39a22 ux: add feedback MVP instead of bug copy
5f3592c Update task list and record project lessons
5a06aed Add a shareable link to events with custom social media previews
062cfde Replace alerts with a custom notice system for user feedback
954183f Update translations for skill matching across multiple languages
``

## 2. README.md
``
# GO IRL Telegram Mini App

![GO IRL logo](public/brand/logo-wide.png)

Before contributing or implementing new features, read:

1. [docs/PRODUCT_PHILOSOPHY.md](docs/PRODUCT_PHILOSOPHY.md)
2. [docs/GO_IRL_CONSTITUTION.md](docs/GO_IRL_CONSTITUTION.md)

Every major product or architecture decision must support the mission:

**Less scrolling. More living.**

If a feature increases screen time but does not increase real-life meetings, it should be reconsidered.

GO IRL (Go In Real Life) is a Telegram Mini App for creating and joining offline activities, starting with Olomouc.

All major product and architecture decisions must follow the [GO IRL Constitution](docs/GO_IRL_CONSTITUTION.md).

## Current Stack

- React, TypeScript, Vite
- Zustand for client state
- Supabase for activities, participants, private join requests, and realtime updates
- Telegram WebApp bootstrap with trusted `initData` verification through Supabase Edge Functions
- Telegram Mini App lifecycle helpers for ready, expand, back, and explicit close actions
- Dark mobile-first UI with safe-area aware header
- Brand assets in `public/brand/`

## Setup

```powershell
pnpm install
pnpm run dev
```

Create `.env.local` from `.env.example` and fill:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_TELEGRAM_BOT_USERNAME=GOirl_bot
VITE_GO_IRL_ADMIN_KEYS=telegram:123456789,telegram_username:yourusername
# Optional local-only compatibility mode. Never enable for public production.
VITE_GO_IRL_LEGACY_DEMO_AUTH=false
```

Security note: `VITE_GO_IRL_ADMIN_KEYS` is DEV/DEMO ONLY. Every `VITE_*` value is bundled into public frontend JavaScript. Do not put real production admin identifiers there.

Trusted auth note: production auth uses `Telegram.WebApp.initData` -> `verifyTelegramInitData` Supabase Edge Function -> verified JWT -> Supabase RLS. The old `x-go-irl-user-key` model is now legacy demo mode only and must stay disabled in public production.

After starting Vite, open the local URL shown in the terminal. For Telegram testing, the deployed Mini App URL is configured in BotFather.

## Verification

```powershell
pnpm run test
pnpm run lint
pnpm run build
```

The build command runs `tsc -b` and then creates the production Vite bundle.

## Implemented

- Universal `Activity` model
- Public and private activities
- Organizer edit flow
- Private join requests with approve/reject actions
- Participants list with joined, waiting, and pending states
- Activity creation with category, activity type, address, and optional location URL
- Save Activity to Google Calendar through a template link without Google OAuth
- Share link that opens the Telegram Mini App with `startapp`
- City selection architecture with Olomouc as the first city
- City expansion with Praha/Prague available through configuration
- Russian, Ukrainian, Czech, and English localization architecture
- Sprint 1 temporary admin allowlist for organizer/admin event deletion
- Safe-area aware fixed header for Telegram Mini App
- Explicit "Done" / "Back to Telegram" UX; the Mini App closes only after a user action
- Sport Vertical MVP with sport-specific card, details, create fields, and matching engine
- ActivityRendererRegistry with Sport and Generic registrations for future vertical expansion
- GO IRL brand logo, favicon, app icon, and Open Graph preview
- Supabase schema and RLS policies in `supabase/schema.sql`
- Supabase Edge Function `verifyTelegramInitData` for Telegram HMAC verification and trusted session issuing
- Supabase setup guide in `supabase/README.md`
- ESLint and Vitest quality gates
- Netlify build configuration in `netlify.toml`
- Vercel fallback deployment configuration in `vercel.json`

## Project Documents

- `docs/PRODUCT_PHILOSOPHY.md` - product manifesto and mission
- `docs/GO_IRL_CONSTITUTION.md` - product and architecture source of truth
- `CHANGELOG.md` - shipped changes
- `ROADMAP.md` - product and engineering direction
- `SPRINTS.md` - sprint-by-sprint delivery plan
- `SPRINT0_STATUS.md` - current Sprint 0 production verification status
- `BACKLOG.md` - confirmed work queue
- `RELEASE_NOTES.md` - release-ready notes for deployment
- `DEPLOYMENT.md` - production deployment and smoke-test checklist
- `supabase/README.md` - Supabase setup, migration, RLS, env, and verification guide
- `docs/Database.md` - target database architecture for users, interests, discovery, digest, and optional activity chat
- `docs/vertical-experiences.md` - vertical modules architecture for sport, dating, friends, food, and generic fallback
- `docs/performance.md` - code splitting, bundle strategy, and vertical loading rules
- `docs/AI.md` - AI platform, discovery, normalization, duplicate detection, and privacy guardrails
- `docs/ai-event-discovery.md` - AI event discovery pipeline plan
- `docs/Notifications.md` - notification preferences, evening digest, and chat notification rules
- `docs/n8n-workflows.md` - future n8n workflow architecture
- `docs/privacy.md` - privacy-first product architecture
- `docs/Security.md` - RLS, permissions, token, abuse, and audit strategy
- `docs/RLS.md` - table-by-table Supabase RLS design
- `docs/Admin.md` - admin roles, permissions, and future admin surfaces
- `docs/Moderation.md` - report, block, moderation hold, and audit architecture
- `docs/RecommendationEngine.md` - recommendation engine v2 architecture
- `docs/reputation.md` - RLI, Trust Score, Community Contribution, attendance confirmation, and reputation privacy
- `docs/EventLifecycle.md` - Activity lifecycle from creation to archive
- `docs/UserLifecycle.md` - user lifecycle from registration to deletion
``

## 3. ROADMAP.md
``
# Roadmap

GO IRL is being built as a platform, not a one-off Telegram Mini App. New work should stay compatible with future web, Android, and iOS clients.

All major product and architecture decisions must follow [docs/GO_IRL_CONSTITUTION.md](docs/GO_IRL_CONSTITUTION.md).

## Strategic Development Order

The current product priority is foundation and infrastructure. Friends, Travel, and Dating are intentionally deferred until the platform layer is stable.

1. Infrastructure Hardening
   - Supabase production readiness.
   - Safe, repeatable migrations.
   - RLS hardening for all user and event data.
   - Roles and permission enforcement.
   - Database verification SQL and release checklist.
   - Remove dependency on local fallback where possible after production migration is applied.
2. Performance
   - Lazy loading.
   - Code splitting.
   - Bundle optimization.
   - Telegram Mini App startup performance.
3. n8n Notifications
   - Server-side notification workflow.
   - Evening digest.
   - Working hours.
   - Quiet hours.
   - No Mini App background work.
4. AI Event Discovery
   - External sources.
   - Event collection.
   - AI normalization.
   - Duplicate detection.
   - Confidence scoring.
   - Save discovered events to the database.
5. Friends Vertical
   - Start only after database and notification foundation is stable.
6. Travel Vertical
   - Start only after Friends and source discovery architecture are stable.
7. Dating Vertical
   - Last, because it requires privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection.

## Phase 1 - Production Foundation

- CRITICAL SECURITY BLOCKER BEFORE PUBLIC RELEASE: replace the frontend-controlled `x-go-irl-user-key` RLS model with trusted Telegram auth.
- Keep build and TypeScript checks green.
- Preserve the current generic event MVP as the fallback experience.
- Sprint 2 architecture docs are prepared: Constitution, Database, RLS, Admin, Security, Notifications, AI, EventLifecycle, UserLifecycle, RecommendationEngine, Moderation.
- Keep Sport as the current reference vertical without expanding into Friends, Travel, or Dating yet.
- Harden Supabase RLS and document every policy.
- Apply backend foundation migration v2 for `user_roles`, moderator/admin helpers, audit log, and verification SQL.
- Apply security hardening migration v3 for DB-level text length constraints.
- Implement Supabase Edge Function for Telegram `initData` HMAC verification.
- Move RLS from request headers to verified auth context.
- Remove public frontend admin allowlist from production security model.
- Chat data model for optional, temporary Activity Chat.
- Chat RLS design with participant-only access.
- Chat toggle in Activity settings as an architecture item, not runtime UI yet.
- Apply and verify migrations for `city_id`, `metadata`, `participant_note`, and `activity_type`.
- Add database verification SQL to release flow.
- Replace local fallback as the primary source of truth once production schema is verified.
- Add Telegram `initData` validation on a trusted backend or edge function.
- Keep Telegram Mini App lifecycle explicit: no surprise close, no background polling, user-triggered close only.
- Privacy settings placeholder.
- No background tracking policy.
- User notification opt-in design.

## Phase 2 - Performance and Product Quality

- Keep Sport vertical MVP as the reference vertical.
- CAL-001 Save Activity to Google Calendar through a template URL without OAuth.
- Maintain ActivityRendererRegistry with Sport and Generic registrations.
- Continue improving event cards, create flow, details, profile, and organizer controls only where needed for current MVP quality.
- Add Discover / For You screen with search, quick filters, and simple matching by city, interests, date, and free spots.
- Add favorite activity selection to the user profile.
- Improve empty, loading, and error states.
- Add city expansion for Prague, Brno, Ostrava, and future cities through configuration.
- Lazy-load heavy screens and vertical modules.
- Optimize production chunks and keep Telegram Mini App first load fast.

## Phase 3 - Server-Side Notifications

- Reputation data model.
- Attendance confirmation design.
- Activity chat MVP after database/RLS foundation is stable.
- Participant-only chat access for organizer, confirmed participants, admin, and moderator.
- Auto-archive Activity Chat after the Activity ends.
- Add server-side notifications for join requests and event updates through n8n.
- Build evening digest workflow through n8n.
- Respect quiet hours and working hours; never send AI/n8n digest at night.
- Store notification preferences in Supabase.
- Keep all notification processing off the Mini App background lifecycle.
- Add Telegram notification bot delivery.
- Prevent duplicate digest sends through `notification_digest_log`.

## Phase 4 - AI Event Discovery

- RLI MVP.
- Organizer attendance confirmation.
- Participant attendance confirmation.
- AI Event Discovery architecture is documented as Sources -> Parser -> AI normalization -> Duplicate detection -> Moderation -> Database -> Recommendations -> Notifications.
- Chat notifications through n8n with quiet hours.
- Report/block in Activity Chat.
- Moderation hold for chats under investigation.
- Build n8n event discovery workflow.
- Use public sources, RSS/API, public Telegram channels, manual moderation, and user suggestions first.
- Facebook Groups are future-only through official API/manual review; no personal-account scraping or stored Facebook credentials.
- Add external source health tracking.
- Add AI event normalization.
- Add AI duplicate detection.
- Add confidence scoring and rejection rules.
- Save discovered events to the database before publication or digest selection.
- Add lifecycle job for `published` -> `expired` / `completed`.
- Add source management admin panel.

## Phase 5 - Deferred Verticals

- Trust Score internal model.
- Community Contribution.
- Referral anti-fraud.
- CAL-002 Future native calendar integration.
- CAL-003 Future Google OAuth calendar sync.
- Activity Chat privacy review.
- Activity Chat retention policies.
- Optional encrypted chat research.
- Friends vertical starts only after database and notification foundation is stable.
- Travel vertical starts only after Friends and source discovery architecture are stable.
- Dating vertical is last and must not begin until privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection are ready.

## Phase 6 - Life Map and Rewards Preparation

- Life Map.
- Achievements.
- Reward program preparation.
- RLI ledger audit/export.
- No crypto/tokenization unless separately reviewed and approved later.

## Maximum Privacy + User Data Security

- Data minimization: store only data needed for events, interests, safety, and notifications.
- Privacy by default: public profile surfaces reveal minimal data.
- User control: edit profile, opt out of notifications, delete account, delete history, export data.
- No background tracking: Mini App never tracks users in the background.
- Server-side notifications: n8n/backend handles notifications and digest delivery.
- Anonymous mode: allow pseudonyms and avoid exposing Telegram username without consent.
- Mutual reveal: contacts are shown only after both sides consent.
- Masked profiles: hide Telegram ID, phone, email, exact address, and internal IDs.
- Event privacy: private and invite-only events can hide location/details until approved.
- AI privacy: AI uses public external event data and anonymized interests only.

## Vertical Experiences

- GO IRL is composed of vertical experience modules, not one universal event flow.
- Sport remains the current reference vertical.
- Generic Activity/Event remains as fallback until a vertical-specific experience is implemented.
- Friends, Travel, and Dating are deferred by strategy and must not be implemented before the infrastructure, performance, n8n, and AI discovery layers are stable.
- Dating is a separate product vertical with `discover -> like/pass -> match -> anonymous chat -> mutual reveal`; it must not use the generic event join flow.
``

## 4. SPRINTS.md
``
# Sprint Plan

GO IRL is developed as a platform, not as a one-off Telegram Mini App. Every sprint should move the product closer to real offline meetings while keeping future Web, Android, and iOS clients in mind.

## Sprint 0 - Foundation

Status: **Complete**

Goal: make the project safe to develop and release.

- GitHub repository connected.
- Build and TypeScript checks pass.
- Lint and tests are configured.
- CI runs test, lint, and build.
- Supabase schema and RLS are documented.
- Deployment checklist exists.
- No secrets are committed.

Completed:

- Latest `supabase/schema.sql` is applied in production Supabase.
- Production RLS hides unrelated private activities.
- Invite/startapp access to a specific private activity is verified.
- GitHub Actions CI passes on `main`.
- Netlify production URL responds successfully.

Manual release smoke-test:

- Run the final Telegram two-account flow before public announcement.

## Sprint 1 - MVP Core

Goal: make the main user journey feel clear, fast, and useful.

- Premium event cards that answer what, when, where, who, price, and join status.
- Redesigned home screen around discovery and categories.
- Activity creation in under 30 seconds.
- Join/request flow in under 15 seconds.
- Organizer edit and private request review.
- Strong empty, loading, success, and error states.

## Sprint 2 - Telegram And Notifications

Goal: make the app feel native inside Telegram.

- BotFather menu button and Mini App URL verified.
- Telegram `startapp` share links verified.
- n8n or backend-triggered Telegram notifications.
- Organizer notification for private join requests.
- Participant notification for approve/reject decisions.
- Activity reminders before start time.

## Sprint 3 - Trust, Verification, RLI

Goal: start building the platform's unique trust layer.

- Attendance confirmation.
- Organizer participant verification.
- Participant-to-participant verification.
- RLI history and basic profile reputation.
- Achievements tied to real participation.

## Sprint 4 - Modules And Discovery

Goal: evolve from a generic event list into a modular platform.

- Sport as the first strong module.
- Module-specific cards, filters, and creation fields.
- Activities, Nature, Parties, Creative, and Learning prepared as independent modules.
- City expansion through configuration.

## Sprint 5 - Production Growth

Goal: prepare for broader public usage.

- Analytics for activation, joins, shares, and completed activities.
- Reporting and moderation.
- Abuse protection.
- Referral loop.
- Web parity with Telegram Mini App behavior.
``

## 5. Project Structure
``
.github\copilot-instructions.md
docs\Admin.md
docs\ai-event-discovery.md
docs\AI.md
docs\Database.md
docs\EventLifecycle.md
docs\GO_IRL_CONSTITUTION.md
docs\Moderation.md
docs\n8n-workflows.md
docs\Notifications.md
docs\performance.md
docs\privacy.md
docs\PRODUCT_PHILOSOPHY.md
docs\RecommendationEngine.md
docs\reputation.md
docs\RLS.md
docs\SECURITY_RELEASE_CHECKLIST.md
docs\Security.md
docs\UserLifecycle.md
docs\vertical-experiences.md
old\apps\telegram-miniapp\tsconfig.json
old\apps\telegram-miniapp\tsconfig.node.json
old\apps\telegram-miniapp\vite.config.ts
old\README.md
old\vite.config.d.ts
project-audit\GO_IRL_PROJECT_AUDIT.json
project-audit\GO_IRL_PROJECT_AUDIT.md
src\calendar\googleCalendar.test.ts
src\calendar\googleCalendar.ts
src\components\ActivityChatPanel.tsx
src\components\AppHeader.tsx
src\components\CoachRequestPanel.tsx
src\config\admin.ts
src\config\cities.test.ts
src\config\cities.ts
src\services\weather.ts
src\share\templates\activity.ts
src\share\share-model-builder.ts
src\share\share-renderer.ts
src\share\share-template-service.ts
src\share\types.ts
src\verticals\registry.ts
src\verticals\sport.test.ts
src\verticals\sport.ts
src\verticals\SportVertical.tsx
src\activityChatFeature.ts
src\App.tsx
src\authSession.ts
src\coachFeature.ts
src\data.test.ts
``

## 6. Dependencies
``json
{
  "@supabase/supabase-js": "^2.108.2",
  "@tanstack/react-query": "^5.101.2",
  "lucide-react": "^1.23.0",
  "react": "^19.2.7",
  "react-dom": "^19.2.7",
  "zustand": "^5.0.14"
}
``

## 7. Supabase Schema
``sql
create extension if not exists pgcrypto;

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  category_id text not null,
  activity_ru text not null,
  activity_cs text not null,
  title_ru text not null,
  title_cs text not null,
  description_ru text not null default '',
  description_cs text not null default '',
  event_date date not null,
  event_time time not null,
  city_id text not null default 'olomouc',
  address text not null,
  location_url text,
  participant_note text,
  activity_type text not null default 'custom' check (activity_type in ('sport', 'dating', 'friends', 'food', 'travel', 'culture', 'local', 'custom')),
  metadata jsonb not null default '{}'::jsonb,
  price integer not null default 0 check (price between 0 and 100000),
  capacity integer not null check (capacity between 2 and 100),
  organizer text not null,
  organizer_key text not null,
  visibility text not null default 'public' check (visibility in ('public', 'private', 'invite')),
  urgent boolean not null default false,
  popular boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.activities
add column if not exists location_url text;

alter table public.activities
add column if not exists city_id text not null default 'olomouc';

alter table public.activities
add column if not exists participant_note text;

alter table public.activities
add column if not exists activity_type text not null default 'custom';

alter table public.activities
drop constraint if exists activities_activity_type_check;

alter table public.activities
add constraint activities_activity_type_check check (activity_type in ('sport', 'dating', 'friends', 'food', 'travel', 'culture', 'local', 'custom'));

alter table public.activities
add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table public.activities
add column if not exists updated_at timestamptz not null default now();

create table if not exists public.activity_members (
  activity_id uuid not null references public.activities(id) on delete cascade,
  user_key text not null,
  display_name text not null default 'GO IRL User',
  status text not null check (status in ('joined', 'waiting')),
  created_at timestamptz not null default now(),
  primary key (activity_id, user_key)
);

create table if not exists public.admin_users (
  user_key text primary key,
  role text not null default 'admin' check (role = 'admin'),
  note text,
  created_at timestamptz not null default now()
);

alter table public.activity_members
add column if not exists display_name text not null default 'GO IRL User';

alter table public.activity_members
drop constraint if exists activity_members_status_check;

alter table public.activity_members
add constraint activity_members_status_check check (status in ('joined', 'waiting', 'pending'));

create index if not exists activities_date_idx on public.activities(event_date, event_time);
create index if not exists activities_organizer_idx on public.activities(organizer_key, event_date);
create index if not exists activities_city_date_idx on public.activities(city_id, event_date, event_time);
create index if not exists activities_type_city_date_idx on public.activities(activity_type, city_id, event_date, event_time);
create index if not exists activities_visibility_date_idx on public.activities(visibility, event_date, event_time);
create index if not exists activity_members_status_idx on public.activity_members(activity_id, status, created_at);
create index if not exists activity_members_user_status_idx on public.activity_members(user_key, status, activity_id);

create or replace function public.go_irl_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists activities_touch_updated_at on public.activities;
create trigger activities_touch_updated_at
before update on public.activities
``

## 8. Environment Variables
``
VITE_SUPABASE_URL=***
VITE_SUPABASE_PUBLISHABLE_KEY=***
``

## 9. Application State
``
Last build: exists
``

## 10. Available Commands
``
{
  "dev": "vite --host 127.0.0.1",
  "typecheck": "tsc -b",
  "lint": "eslint .",
  "test": "vitest run",
  "build": "vite build",
  "preview": "vite preview --host 127.0.0.1"
}
``

## 11. Project Vision

**GO IRL** — Telegram Mini App для встреч в реальной жизни.

- **Цель:** уменьшить экранное время, увеличить живые встречи
- **Основная ценность:** быстрый ответ на вопрос 'Что интересного я могу сделать сегодня с другими людьми рядом со мной?'
- **Аудитория:** люди 18–40 лет, которые хотят находить события и знакомства без бесконечного скролла
- **Ключевая метрика:** количество реальных встреч / участников

## 12. White Paper (Technical Concept)

### Архитектура

- **Frontend:** React + TypeScript + Vite (SPA)
- **State Management:** Zustand
- **Backend:** Supabase (PostgreSQL + RLS + Edge Functions)
- **Auth:** Telegram Mini App initData → Edge Function → JWT
- **Hosting:** Vercel (frontend), Supabase (backend)

### Основные сущности

- ctivities — мероприятия (время, место, участники)
- ctivity_members — участники мероприятия
- coach_profiles — профили тренеров
- coach_requests — заявки на тренера
- coach_reviews — отзывы о тренерах
- ctivity_chats — чаты событий

### Security

- **RLS** — все таблицы защищены Row Level Security
- **Trusted Auth** — Telegram initData верифицируется через Edge Function
- **JWT** — выдается после успешной проверки
- **Admin/Moderator** — роли для управления событиями

## 13. Current Progress

### Sprint 0 — Foundation ✅
- GitHub репозиторий ✅
- TypeScript сборка ✅
- Линтер и тесты ✅
- Supabase схема ✅
- Деплой чеклист ✅

### Sprint 1 — MVP Core ⏳ (~80%)
- Premium карточки событий ✅
- Главная страница ✅
- Создание события ✅
- Join/request ✅
- Организатор может редактировать ✅
- Участники на карточке ✅
- Initial load событий ✅
- Демо-режим ✅

### Sprint 2 — Notifications ❌ (~10%)
- Уведомления организатору ❌
- Уведомления участникам ❌
- Напоминания ❌

### Phase 1 — Production Foundation ✅
- Trusted Telegram auth ✅
- Edge Function verifyTelegramInitData ✅
- RLS через JWT ✅
- Миграции v2/v3/v4/v5 ✅

### Phase 2 — Performance ❌
- Lazy loading ❌
- Code splitting ❌
- Оптимизация бандла ❌

### Overall MVP Readiness: ~75%

## 14. Known Issues

1. **Share link** — иногда открывает браузер вместо Telegram
2. **Initial load** — исправлен, требует регрессионного теста
3. **Chat expiration** — требует проверки на реальном событии
4. **Coaching** — компоненты добавлены, не протестированы
5. **Map** — кнопка вместо iframe

## 15. Next Steps

1. Протестировать initial load в Telegram Mini App
2. Протестировать chat expiration на событии с duration
3. Добавить форму обратной связи вместо alert
4. Настроить уведомления (Sprint 2)
5. Оптимизация производительности (lazy loading)

## 16. Team & Contacts

- **Lead Developer:** Vitvolny26
- **Repository:** https://github.com/vitvolny26-art/GO-IRL
- **Production:** https://go-irl.vercel.app
- **Telegram Bot:** @GOirl_bot

