# GO IRL Market Positioning

Status: **current product source of truth for market positioning**
Scope: GO IRL closed beta, Olomouc first
Last updated: 2026-07-08

## Core thesis

GO IRL must not compete as another event calendar.

**GO IRL is a Telegram-first local meetup layer for small real-life activities.**

The product turns a weak intent into a real meeting:

```text
create event -> share in Telegram -> people join -> event chat -> people show up in real life
```

The main user problem is not lack of calendars. The main problem is that people see or discuss plans online but do not reliably convert them into real-life attendance.

## Product promise

**Less scrolling. More living.**

Practical beta promise:

> Create a small local meetup in under a minute, share it in Telegram, see who joined, chat with participants, and meet in real life.

## Who we are

GO IRL is:

- a Telegram Mini App for local micro-meetups;
- a structured layer above Telegram chats;
- a tool for simple real-life activities nearby;
- a lightweight social trust layer through organizer, host, participants, and event chat;
- Olomouc-first, with future expansion to Czech cities and Europe.

## Who we are not

GO IRL is not:

- an event calendar like GoOut or Eventbrite;
- a ticketing platform;
- a sport-only app like Opponent, Squaddler, or Sportual;
- a dating app;
- a heavy community CRM;
- a social feed;
- an Instagram-style content product;
- a club membership system;
- an AI recommendation product before enough real usage data exists.

## Competitive map

| Segment | Examples | Their strength | Their weakness | GO IRL answer |
|---|---|---|---|---|
| Local calendars and ticketing | GoOut, Eventbrite, Olomouc.eu, Olomouc Tourism, Kudy z nudy | Supply, discovery, official events, tickets | They do not solve "who goes with me" or event chat | Be the social layer, not the calendar |
| Sports social apps | Opponent.app, Squaddler, Sportual | Clear sport use case, skill level, games, teams | Too narrow, standalone apps, often sport-only | Use sport as one strong category, not the whole product |
| Messenger organizers | Squaddle | Removes group-chat chaos, tracks who is in/out | WhatsApp-first, mostly existing groups, weak discovery | Build Telegram-first structured coordination |
| Community platforms | Meetup, Meet5, Timeleft | Groups, recurring events, hosts/captains, trust | Slower, heavier, separate app, often curated | Be faster and lighter for micro-meetups |
| Invite/event page tools | Partiful, Luma, Apple Invites | Beautiful pages, RSVP, reminders, social proof | Party/invite focus, not local discovery, may add payments | Borrow event-page clarity, not party complexity |
| Existing chat groups | Telegram/WhatsApp/Facebook groups | Already where people are | Chaos, lost messages, unclear attendance | Provide event cards, join state, participant list, event chat |

## What to borrow from competitors

### From Opponent.app and Squaddler

Borrow:

- clear activity type;
- time and place visible immediately;
- participant capacity;
- casual / beginner-friendly / competitive style;
- optional skill or intensity later;
- simple promise: find people to play with nearby.

Do not borrow now:

- sport-only positioning;
- complex matching engine;
- many sport-specific fields;
- separate app-first onboarding.

GO IRL application:

> Volleyball today at 18:30, Smetanovy sady, 3/8 joined, casual, beginners welcome.

### From Sportual

Borrow later:

- waitlist;
- recurring sport events;
- organizer roles;
- attendance tracking;
- club tools only after demand is proven.

Do not borrow for beta:

- payments;
- dues;
- full club CRM;
- complex team administration.

### From Squaddle

Borrow:

- the core thesis: group chat is chaotic;
- simple in/out status;
- nothing to download beyond the existing messenger context;
- organizer time saved by structured attendance.

GO IRL application:

> Do not discuss attendance in 40 Telegram messages. Tap Join.

### From Partiful and Luma

Borrow:

- fast event creation;
- event page that makes people want to join;
- participant/social proof;
- shareable link preview;
- clear RSVP / Join CTA;
- immediate next step after joining.

Do not borrow now:

- ticketing;
- payments;
- photo albums;
- party-heavy visual language;
- complex guest questions;
- text blast systems.

### From Meetup and Meet5

Borrow:

- organizer trust;
- visible participants;
- repeatable activities later;
- community captain / host concept;
- public group setting as a safety signal.

GO IRL application:

> Host will be there. You are not joining an empty plan.

### From GoOut and Eventbrite

Borrow:

- clean event page hierarchy;
- date, place, description, organizer, status;
- share preview discipline;
- category clarity.

Do not borrow now:

- ticketing;
- commercial organizer dashboards;
- giant catalog strategy;
- official event marketplace positioning.

## MVP beta categories

Closed beta should stay narrow:

1. Volleyball
2. Running
3. Walking
4. Coffee meetup
5. Board games
6. Language exchange

Why these six:

- frequent enough;
- low-cost or free;
- easy to understand;
- good for expats/newcomers;
- work in Olomouc;
- mix sport, casual social, and intellectual/social formats.

## MVP must-have product loop

P0 loop:

```text
open Telegram
-> see local events nearby
-> understand card in 3 seconds
-> tap Join
-> see who else joined
-> open event chat
-> show up in real life
```

P0 features:

- stable event cards;
- event creation in 30-60 seconds;
- Telegram share link;
- join state;
- participant count and capacity;
- event chat;
- basic profile/avatar;
- organizer/host visibility;
- browser mock mode for testing without Telegram.

## Do not build before beta

Forbidden for MVP beta:

| Feature | Why not now |
|---|---|
| Ticketing/payments | Shifts product into Eventbrite/GoOut/Luma territory and creates legal/support risk |
| Club CRM | Too heavy for Olomouc beta |
| Subscriptions/premium | No validated retention yet |
| AI recommendations | Too early without real event and attendance data |
| Complex profiles | Slows onboarding |
| Ratings/reviews | Can damage early community warmth |
| Post-event albums/feed | Increases screen time, not arrival rate |
| Direct messages | Telegram already covers this |
| Many cities | Dilutes Olomouc density |
| Big map interface | Useful later, not necessary for beta core loop |
| Full recurring engine | P1 after manual repeat behavior is proven |

## Product decisions

### Positioning

Use:

> Telegram Mini App for local micro-meetups: sport, coffee, walks, board games, and language exchange.

Avoid:

> Event calendar for Olomouc.

Avoid:

> Social network for events.

Avoid:

> Sport matching app.

### Host / Coach wording

Current code may keep the Coach concept for sport-specific MVP.

Product wording should be broader where needed:

- **Organizer**: person who created the event.
- **Host**: person who will be there and helps the group start.
- **Coach**: sport-specific helper for training/newcomer support.

Do not turn Coach into a paid marketplace before the basic event loop is stable.

## Expansion strategy

### Stage 1: Olomouc beta

Goal:

- prove that small events convert into real attendance.

Focus:

- 6 categories;
- Telegram sharing;
- host trust;
- event chat;
- manual community seeding.

Primary metrics:

- created events;
- join rate;
- participant count per event;
- chat activation;
- attendance confirmation if available;
- repeat organizers;
- repeat participants.

### Stage 2: Czech expansion

Next cities only after Olomouc has density:

- Prague;
- Brno;
- Ostrava;
- Plzen;
- Hradec Kralove;
- university/expat hubs.

Do not expand by empty city catalog. Expand by host/community supply.

### Stage 3: Europe

Best wedge:

- expats;
- students;
- newcomers;
- Telegram-heavy communities;
- sport and language exchange as repeatable anchors.

## Strategic guardrail

Every new feature must pass this test:

> Does this make it easier for people to leave the chat and meet in real life?

If no, it is future scope or should be rejected.
