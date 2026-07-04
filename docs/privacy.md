# Privacy Architecture

GO IRL is privacy-first by default. The app should help people meet in real life without collecting unnecessary personal data.

## Principles

### Data Minimization

- Store only fields required for events, interests, safety, and notifications.
- Do not store unnecessary action history.
- Do not store raw Telegram init data longer than needed.

### Privacy by Default

- Profiles are not fully public by default.
- Public surfaces show only display name, city, public bio, interests, and trust signals.
- Internal IDs, Telegram IDs, phone, email, and exact private location are hidden.

### User Control

Users should be able to:

- edit profile
- disable notifications
- delete account
- delete or anonymize activity history
- export data

### No Background Tracking

- Mini App does not track users in the background.
- No hidden trackers.
- No geolocation without explicit consent.

### Server-Side Notifications

- Notifications are backend/n8n driven.
- Mini App does not run in the background to send notifications.

## Data Collected

Planned minimal data:

- app user ID
- city
- language
- display name or pseudonym
- public bio
- interests
- event participation state
- notification preferences
- digest delivery log

## Data Not Collected by Default

- phone number
- email
- exact GPS location
- contact list
- raw private chats
- hidden browsing behavior
- Telegram username exposure without consent

## Anonymity Features

Planned:

- anonymous mode with pseudonym
- masked profiles
- mutual contact reveal
- private/invite-only event controls
- hidden location until approved
- anonymous chat later

## Dating Privacy

Dating is a separate vertical with stronger privacy defaults.

Rules:

- no public Telegram username leakage
- contacts revealed only by mutual consent
- anonymous chat before identity reveal
- block/report available in every step
- rate limits and anti-spam required before public launch
- age gate required before public launch
- dating profile visibility separate from generic event profile visibility

## AI Data Use

AI should analyze public external events, not private user profiles.

Allowed:

- public event text
- public source URL
- city/category hints
- anonymized interest categories
- source trust metadata

Not allowed:

- Telegram ID
- email
- phone
- exact private profile data
- private notification delivery identifiers
- personal Facebook account data
- private or closed group content
- login credentials or session cookies

Users should later have opt-out from AI recommendations.

## External Source Privacy

Event discovery must use public and permitted sources only.

Allowed MVP source types:

- public websites
- RSS feeds
- official APIs
- public Telegram channels
- public calendars
- manual moderator-added sources
- user-submitted event suggestions

Facebook Groups are future-only and must use official API access or manual review. GO IRL must not automate a personal Facebook account or store Facebook credentials.

## Mini App Background Policy

The Mini App does not run background discovery or notifications.

Reasons:

- user control and transparency
- lower battery use
- Telegram WebView lifecycle can suspend the app
- no hidden tracking
- no service secrets in frontend code

Server-side n8n/backend jobs handle discovery, digest, and notification delivery.

## Deletion

Future deletion flow:

- delete or anonymize user profile
- remove notification preferences
- anonymize old event participation where needed
- delete chat history when chats exist
- keep only legally/safety-required audit records with minimization
