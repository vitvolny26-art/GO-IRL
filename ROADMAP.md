# Roadmap

GO IRL is being built as a platform, not a one-off Telegram Mini App. New work should stay compatible with future web, Android, and iOS clients.

All major product and architecture decisions must follow [docs/GO_IRL_CONSTITUTION.md](docs/GO_IRL_CONSTITUTION.md).

For the Sport Coach MVP 1.1 scope, see [docs/SPORT_COACH_MVP.md](docs/SPORT_COACH_MVP.md).

## Strategic Development Order

The current product priority is foundation and infrastructure. Friends, Travel, and Dating are intentionally deferred until the platform layer is stable.

Before new vertical expansion, Closed Beta must validate the Sport Coach hypothesis in Olomouc:

> Sport events with a confirmed coach should have a higher show-up rate and higher beginner comfort than sport events without a coach.

1. Infrastructure Hardening
   - Supabase production readiness.
   - Safe, repeatable migrations.
   - RLS hardening for all user and event data.
   - Roles and permission enforcement.
   - Database verification SQL and release checklist.
   - Remove dependency on local fallback where possible after production migration is applied.
2. Sport Coach MVP 1.1
   - Keep Coach sport-only.
   - Stabilize coach request flow for sport events.
   - Add demo confirmed coach for browser mock mode.
   - Add coach detail block and sport card badge.
   - Measure show-up rate and beginner comfort.
3. Performance
   - Lazy loading.
   - Code splitting.
   - Bundle optimization.
   - Telegram Mini App startup performance.
4. n8n Notifications
   - Server-side notification workflow.
   - Evening digest.
   - Working hours.
   - Quiet hours.
   - No Mini App background work.
5. AI Event Discovery
   - External sources.
   - Event collection.
   - AI normalization.
   - Duplicate detection.
   - Confidence scoring.
   - Save discovered events to the database.
6. Event Roles Foundation
   - Start only after Sport Coach improves show-up rate or beginner comfort.
   - Future roles are not called Coach.
   - Board games can use Game Master.
   - Language events can use Language Buddy or Conversation Mentor.
   - City walks can use Guide.
   - Social meetups can use Host or Icebreaker.
7. Friends Vertical
   - Start only after database and notification foundation is stable.
8. Travel Vertical
   - Start only after Friends and source discovery architecture are stable.
9. Dating Vertical
   - Last, because it requires privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection.

## Sport Coach MVP 1.1

Coach is a sport-only role in MVP 1.1.

Coach is not a generic event helper. Guides, tutors, social hosts, game masters, referees, and moderators are future Event Roles work and must not be mixed into the Coach MVP.

### Product goal

Reduce the fear of joining sport events and improve real-life attendance.

The coach helps with:

- warm-up;
- rules;
- beginner support;
- team flow;
- safety;
- helping users feel comfortable when arriving alone.

### MVP patches

1. Coach model compatibility
   - Keep the existing `coach_profiles`, `coach_requests`, and `coach_reviews` model.
   - Keep `user_key`, `activity_id`, and `coach_profile_id`.
   - Do not replace with `user_id`, `event_id`, or `coach_id` in MVP 1.1.
2. Demo Sport Coach
   - Browser/no Telegram demo uses Alex, Sport Coach, Olomouc.
   - Demo request becomes confirmed immediately.
   - Demo writes never touch production Supabase.
3. Sport Coach Bottom Sheet
   - Button: "Need a coach" / "Нужен тренер".
   - Choice: Sport Coach, Beginner Helper, Team Captain.
   - Organizer note.
   - Status: requested or confirmed.
4. Sport Coach Event Block
   - Event detail shows confirmed coach.
   - Chat link stays close to coach block.
   - Copy explains that coach helps beginners and event flow.
5. Sport Coach Badge
   - Sport cards show "✨ Есть тренер" only for confirmed coach.
   - Pending requests must not show the confirmed badge.
6. Minimal Review
   - 1-5 rating.
   - Short comment.
   - Beginner comfort marker: "Did the coach help you feel comfortable if you came alone?"

### Beta metrics

Primary:

- Show-up Rate: joined users who actually came.

Supporting:

- coach badge open/click rate;
- join -> chat message rate;
- join -> attendance confirmation rate;
- beginner comfort yes/no;
- repeat sport attendance;
- organizer coach-request conversion.

### Not now

- Payments.
- Marketplace.
- Universal event roles.
- Referee.
- City guide.
- Language buddy.
- Tutor.
- Social host.
- Game master.
- Verified coach badge.
- Availability calendar.

## Event Roles Vision

Future Event Roles are the scalable pattern after Sport Coach is validated.

The product rule:

> For every event type, use the role name that is clear in one second.

Examples:

| Vertical | Future role |
|---|---|
| Sport | Coach, Referee, Captain, Safety Lead |
| Board games | Game Master |
| Language | Language Buddy, Conversation Mentor |
| City walks | Guide, Route Leader |
| Social meetups | Host, Icebreaker |

Future normalized tables may include:

- `event_role_profiles`
- `event_role_requests`
- `event_role_assignments`
- `event_role_reviews`

Do not build these before Sport Coach proves value.

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
- Sport Coach is the next narrow beta validation layer for Sport only.
- Generic Activity/Event remains as fallback until a vertical-specific experience is implemented.
- Future Event Roles must use native role names per vertical instead of calling every helper a coach.
- Friends, Travel, and Dating are deferred by strategy and must not be implemented before the infrastructure, performance, n8n, and AI discovery layers are stable.
- Dating is a separate product vertical with `discover -> like/pass -> match -> anonymous chat -> mutual reveal`; it must not use the generic event join flow.

<!-- GO_IRL_MVP_STABILIZATION_PHASE -->
## MVP Stabilization Phase

Priority before Closed Beta:

1. Stabilize Sport Coach + Activity Chat with Weather enabled.
2. Add Browser Demo / MockAuth mode.
3. Fix event card time rendering.
4. Fix profile save and avatar upload.
5. Replace bug-report clipboard/alert flow.
6. Add safe Open-Meteo weather widget.
7. Fix Telegram share links and prepare /join/:id OG previews.

Definition of done:
- lint/build/test pass;
- no broken Telegram auth;
- demo mode works in browser;
- no technical labels leak into UI;
- README and roadmap updated after each milestone.

<!-- GO_IRL_STABILIZATION_TASKS_5_8 -->
## Stabilization update: Tasks 5-8

Date: 2026-07-07

Closed stabilization scope:
- Task 5 Profile Fix
  - Profile edit action now saves user changes instead of acting like a close button.
  - Local avatar upload is supported.
- Task 6 Bug Report Fix
  - Bug report action opens support link.
  - Removed alert/copy-share behavior from bug reporting.
- Task 7 Weather Widget
  - Sport event details show Open-Meteo based weather summary and details.
  - Future events outside forecast range show a safe availability message.
- Task 8 Share Fix
  - Share links use Telegram Mini App startapp deep links.
  - Browser /join/:id opens the target activity.
  - Vercel SPA rewrite and Open Graph metadata are present.

Verification:
- pnpm run lint: PASS
- pnpm run build: PASS
- pnpm run test: PASS, 10 files / 51 tests

Related commits:
- cc67706 fix: save profile from edit button
- a021e10 fix: support local profile avatar upload
- dee51af fix: open bug report support link
- a61947d fix: show weather summary in sport sheet
- 7087b86 fix: show weather details in sport sheet
- e44152d fix: use telegram mini app share link
- ea63432 fix: open join route activity
