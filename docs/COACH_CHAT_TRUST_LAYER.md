# Coach / Role + Chat Trust Layer

## Product idea

GO IRL is not a feed and not a passive event calendar.

The product exists to move a user through this loop:

```text
see event -> trust event -> join -> chat -> show up in real life
```

The biggest weak point is not event discovery. The biggest weak point is trust before arrival.

A user often thinks:

- “I do not know anyone there.”
- “What if I am too weak for the sport level?”
- “What if nobody talks?”
- “What if I do not understand the format?”
- “What if I arrive and feel stupid?”

The Coach / Role + Chat layer exists to reduce this fear.

## Core principle

Every event detail screen should eventually have two trust anchors near each other:

1. **Role / helper block** — a visible human or role that makes the event safer and clearer.
2. **Activity Chat** — a temporary group space where participants can coordinate before the event.

Together they answer:

> Who will help this event happen, and where can I talk to the group before I arrive?

## Why the blocks should be close

Role and chat solve the same conversion problem from different angles.

| Problem | Role block solves | Chat solves |
|---|---|---|
| Fear of arriving alone | Shows a responsible/supporting person | Lets user write before arrival |
| Unclear format | Explains who leads or supports the event | Lets users ask details |
| Low trust | Shows event has structure | Shows group is alive |
| No-show risk | Makes event feel real | Creates social commitment |
| Newbie anxiety | Shows help is available | Lets user admit they are new |

The role block creates confidence.
The chat creates commitment.

## Current MVP boundary

The current canonical MVP 1.1 role is **Sport Coach**.

Coach means sport-only.

Sport Coach is the product proof:

> Sport events with a confirmed coach should improve show-up rate and beginner comfort.

Current Sport Coach docs remain the source of truth:

- `docs/SPORT_COACH_MVP.md`
- `ROADMAP.md` Sport Coach MVP 1.1 section

## Generic event bridge

Generic events may temporarily reuse a Coach/Role panel next to Activity Chat as a stabilization bridge, but this must be treated carefully.

This bridge is allowed only as a short-term UI/architecture bridge if the implementation needs one common mounting point for:

- generic event detail sheet;
- Activity Chat;
- future Event Roles;
- beta trust experiments.

It must not redefine Coach as a universal role.

For generic events, the long-term product language should move away from `Coach` and toward native role names:

| Event type | Future role label |
|---|---|
| Board games | Game Master |
| Language exchange | Language Buddy / Conversation Mentor |
| Walking / city event | Guide / Route Leader |
| Coffee meetup | Host / Icebreaker |
| Sport | Coach / Captain / Referee |

## Important naming rule

A role name must be understood in one second.

Do not call every helper a coach.

Correct:

```text
Sport -> Coach
Board games -> Game Master
Language -> Language Buddy
City walk -> Guide
Coffee meetup -> Host
```

Wrong:

```text
Everything -> Coach
```

## UI placement rule

In event details, the order should eventually be:

```text
Event facts
Participants / join status
Role / helper block
Activity Chat
Main actions
```

For Sport events:

```text
Sport Coach block
Activity Chat
```

For generic events during the bridge phase:

```text
Temporary Coach/Role bridge block
Activity Chat
```

But the generic block must be documented as temporary until Event Roles exist.

## Duplication rule

Sport events must not show duplicated Coach panels.

If Sport detail already renders `CoachRequestPanel`, Activity Chat must not inject another one.

Safe condition:

```text
show generic role bridge only when activity is not sport
```

Suggested guard:

```text
activity.type !== "sport" && activity.categoryId !== "sport"
```

## State model

The UI should distinguish between these states:

| State | Meaning | Public badge? |
|---|---|---|
| no role | No helper requested | No |
| requested | Organizer asked for help | No |
| confirmed | Helper confirmed | Yes |
| completed | Event passed | Optional historical |
| rejected/cancelled | No active helper | No |

Only confirmed role/support should create a public confidence badge.

Pending requests must not look like confirmed trust.

## Relation to Activity Chat

Activity Chat is not a social feed.

It is a temporary event coordination space.

It should support:

- “I am coming.”
- “Where exactly do we meet?”
- “I am a beginner, is it okay?”
- “Who brings the ball / game / equipment?”
- “I am five minutes late.”

It should not become:

- endless direct messaging;
- public comments;
- post-event social feed;
- dating chat;
- permanent group chat replacement.

## Metrics

This layer should be judged by real-life outcomes, not screen time.

Primary metrics:

- Join -> show-up rate.
- Join -> first chat message.
- Chat active before event.
- Newbie comfort feedback.
- Repeat attendance.
- Event cancellation/no-show rate.

For Sport Coach specifically:

- Events with confirmed coach vs events without coach.
- Beginner comfort: yes/no.
- Coach request conversion by organizers.

For future Event Roles:

- Role badge open/click rate.
- Role-confirmed events vs no-role events.
- Category-specific attendance improvement.

## Implementation guardrails

- Do not rewrite `App.tsx` unless necessary.
- Prefer small panel-level patches.
- Do not duplicate Coach in sport detail.
- Do not change Supabase RLS/auth for this UI placement task.
- Do not add payments.
- Do not add universal role tables before the Sport Coach pattern is validated.
- Do not show a public badge for pending requests.
- Do not claim beta-ready until lint/build/test pass.

## Future architecture

After Sport Coach proves value, the generic bridge should evolve into Event Roles.

Future tables may include:

- `event_role_profiles`
- `event_role_requests`
- `event_role_assignments`
- `event_role_reviews`

At that point:

- Sport Coach can stay as a sport-specific implementation or migrate into Event Roles.
- Generic event sheets should render role blocks through a role abstraction.
- `CoachRequestPanel` should no longer be the generic name for non-sport events.

## Product summary

The idea is not “add Coach everywhere.”

The idea is:

> Every real-life event needs enough trust to make people actually show up.

Sport proves this through Coach.

Other categories will later get their own native roles.

Chat stays next to the role because both features solve the same beta problem:

> make the event feel real, safe, and socially easier before the user arrives.
