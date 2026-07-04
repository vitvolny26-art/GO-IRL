# AI Event Discovery

GO IRL will eventually discover relevant city events without the Mini App running in the background. This is a server-side/n8n architecture plan only.

## Goals

- Discover public offline activities in the user's city.
- Normalize messy external event data.
- Remove spam, duplicates, and irrelevant content.
- Promote trusted events into the canonical `events` table.
- Avoid sending personal user data to AI services.

## Sources

Initial source types:

- event websites
- Facebook groups
- Telegram channels
- city event boards
- sports and local club sites

Configured sources live in `external_sources`.

## Discovery Schedule

n8n runs three times per day:

- morning check
- afternoon check
- early evening check before digest generation

The exact schedule belongs to n8n, not the Mini App.

## Pipeline

1. n8n reads active `external_sources`.
2. n8n fetches public event data from each source.
3. Raw source response is saved or hashed for traceability.
4. AI normalizes each candidate:
   - title
   - description
   - category
   - city
   - location
   - start/end date and time
   - price
   - source URL
   - confidence score
5. AI rejects spam, irrelevant posts, old events, and non-offline content.
6. AI marks probable duplicates.
7. Candidate is saved to `discovered_events`.
8. High-confidence events can be auto-approved later.
9. Medium-confidence events go to admin/source review.
10. Approved candidates are promoted to `events`.

## Duplicate Detection

Signals:

- same source URL
- same normalized title
- same city/location/date
- close start time
- text similarity hash
- source record ID

Duplicates stay in `discovered_events` with `duplicate_of` set.

## AI Privacy

AI may receive:

- public external event text
- source URL
- city/category hints

AI must not receive:

- Telegram ID
- phone
- email
- private profile fields
- notification delivery identifiers
- exact user activity history

For recommendations, AI should use anonymized interest/category inputs only.

## Promotion Rules

Promote to `events` only when:

- event is offline
- city and start time are known
- source URL is present
- confidence is above threshold
- event is not a duplicate
- price is within allowed limits
- category is mapped

## Not Implemented Now

- real Facebook parsing
- real OpenAI API calls
- real n8n workflow JSON
- admin review UI
- automatic event promotion
