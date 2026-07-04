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

- Keep build and TypeScript checks green.
- Preserve the current generic event MVP as the fallback experience.
- Keep Sport as the current reference vertical without expanding into Friends, Travel, or Dating yet.
- Harden Supabase RLS and document every policy.
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

- CAL-002 Future native calendar integration.
- CAL-003 Future Google OAuth calendar sync.
- Activity Chat privacy review.
- Activity Chat retention policies.
- Optional encrypted chat research.
- Friends vertical starts only after database and notification foundation is stable.
- Travel vertical starts only after Friends and source discovery architecture are stable.
- Dating vertical is last and must not begin until privacy, safety, anonymous chat, mutual reveal, reporting, moderation, and abuse protection are ready.

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
