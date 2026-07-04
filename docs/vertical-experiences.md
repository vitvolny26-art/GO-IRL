# Vertical Experiences Architecture

GO IRL is not a single generic event list. It is a platform of vertical experience modules. Each vertical can have its own data, UI, matching, safety, privacy, and notification rules.

The current Sprint 1 product remains a generic event MVP. Vertical modules must be added gradually without breaking the generic fallback.

## Principle

Each activity vertical can define:

- own fields
- own filters
- own cards
- own create form
- own details screen
- own join/request or match flow
- own privacy rules
- own recommendation algorithm
- own UI components
- own safety rules
- own notification rules

Shared platform layer should contain only:

- User
- Profile
- City
- Interest
- Activity
- Event
- Notification
- Trust/Safety
- Common UI primitives

Do not force sport, dating, friends, food, local events, and generic activities through one universal product flow.

## Activity Types

Target `activity_type` values:

- `sport`
- `dating`
- `friends`
- `food`
- `culture`
- `local`
- `custom`

Generic `custom` / fallback events use the current base model until a specialized module exists.

## Shared Event Layer

Every Activity/Event has a common layer:

- `id`
- `type`
- `title`
- `description`
- `city`
- `starts_at`
- `created_by`
- `visibility`
- `status`

Vertical-specific data lives in metadata at the early stage:

- `sport_meta`
- `dating_meta`
- `friends_meta`
- `food_meta`
- `custom_meta`

JSONB metadata is acceptable for early iterations, but mature verticals should be normalized into dedicated tables when fields become stable and query-heavy.

## Sport Vertical

Sport is not just a category. It needs sport-specific logic.

Fields:

- sport type
- skill level: `beginner`, `intermediate`, `advanced`
- format: `casual`, `training`, `competition`
- participants / team size
- equipment
- place
- price
- weather dependency, if needed

Examples:

- football
- running
- inline skating
- cycling
- volleyball
- tennis
- fitness
- yoga

Flow:

1. Choose sport.
2. Select level and format.
3. Add place, time, capacity, equipment, price.
4. Users join/request based on visibility and capacity.
5. Matching prioritizes city, sport type, skill level, free spots, and time.

Sport can use the event join/request model, but the create form, filters, card, and recommendations should be sport-specific.

## Dating Vertical

Dating is a separate product vertical, not a normal event category.

It may learn from common mechanics in dating products such as swipe discovery, mutual match, anonymous chat, and safety-first identity reveal, but it must not copy brand design or proprietary flows directly.

Dating profile fields:

- age gate / age range later
- city
- interests
- what the user is looking for
- communication format
- anonymous mode
- avatar/photo later
- visibility
- privacy controls

Matching flow:

1. Discover dating profiles.
2. Like or pass.
3. Mutual match unlocks anonymous chat.
4. Identity reveal only by mutual consent.
5. Telegram username remains hidden unless the user agrees.
6. User can block or report at any time.

Safety:

- report
- block
- moderation
- rate limits
- anti-spam
- age gate
- consent-first reveal
- no public contact leakage

Dating must not use the generic event join flow. Its flow is:

`discover -> like/pass -> match -> anonymous chat -> mutual reveal`

## Friends Vertical

Friends / social hangouts focus on casual group meetings.

Examples:

- find company
- walk
- coffee
- board games
- language exchange
- shared trip
- casual meetup

Flow:

1. Create meetup.
2. User sends request or joins, depending on privacy.
3. Organizer approves when needed.
4. Group participant/chat layer later.

Recommendations prioritize city, shared interests, time window, event format, and organizer trust.

## Food Vertical

Food needs food-specific fields and decisions.

Examples:

- cafe
- restaurant
- bar
- breakfast
- dinner
- tasting

Fields:

- cuisine
- average check
- place
- reservation status
- who pays
- meeting format

Recommendations prioritize city, cuisine preference, budget, time, reservation confidence, and group size.

## Generic Event Fallback

Generic Activity/Event remains as a fallback when no vertical is implemented.

Rules:

- use base Activity/Event fields
- use generic card/details/create form
- use generic join/request flow
- keep compatibility with current Dashboard, Discover, Create Event, Event Details, and Profile

A vertical can replace fallback behavior later through renderer and flow registries.

## UI Architecture

Introduce an `ActivityRendererRegistry`.

Conceptual renderers:

- `SportActivityCard`
- `DatingProfileCard`
- `FriendsEventCard`
- `FoodEventCard`
- `GenericActivityCard`

The registry selects UI by `activity.type`.

The same registry pattern applies to:

- create form
- details screen
- filters
- join/match flow
- recommendation section
- notification template

Example shape:

```ts
type ActivityRendererRegistry = {
  sport: SportExperienceModule;
  dating: DatingExperienceModule;
  friends: FriendsExperienceModule;
  food: FoodExperienceModule;
  culture: GenericExperienceModule;
  local: GenericExperienceModule;
  custom: GenericExperienceModule;
};
```

## Recommendation Architecture

Each vertical owns its matching logic.

Engines:

- `SportRecommendationEngine`
- `DatingMatchingEngine`
- `FriendsRecommendationEngine`
- `FoodRecommendationEngine`
- `GenericRecommendationEngine`

The shared recommendation layer coordinates engines but must not force identical rules on every vertical.

Dating matching is separate from event recommendation. It must account for consent, safety, age gate, privacy settings, blocks, reports, and mutual reveal state.

## Notification Rules

Notification templates should be vertical-aware:

- sport: game level, missing players, weather, equipment
- dating: match, anonymous chat, reveal consent
- friends: request approval, group plans
- food: reservation, budget, place/time changes

Mini App still does not run in the background. All notifications remain server/n8n driven.

## Migration Path

1. Keep current generic event MVP.
2. Add `activity_type` and metadata fields to future DB model.
3. Add renderer registry with generic fallback.
4. Build Sport vertical first.
5. Add Friends/Food verticals.
6. Build Dating separately with safety and privacy architecture before launch.
7. Normalize JSONB metadata into stable vertical tables when usage proves the shape.
