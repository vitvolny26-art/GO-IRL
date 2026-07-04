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

## AI Data Use

AI should analyze public external events, not private user profiles.

Allowed:

- public event text
- public source URL
- city/category hints
- anonymized interest categories

Not allowed:

- Telegram ID
- email
- phone
- exact private profile data
- private notification delivery identifiers

Users should later have opt-out from AI recommendations.

## Deletion

Future deletion flow:

- delete or anonymize user profile
- remove notification preferences
- anonymize old event participation where needed
- delete chat history when chats exist
- keep only legally/safety-required audit records with minimization
