

# GO IRL Bible

# Book III

## 04 — Database Design

Version 1.0

---

# Philosophy

The database is the heart of GO IRL.

Every feature begins here.

If data is modelled correctly, Backend becomes simpler.

Frontend becomes simpler.

AI becomes smarter.

Scaling becomes easier.

Never design the database around screens.

Design it around the business domain.

---

# Core Entity

The most important architectural decision:

GO IRL has only one primary entity.

```text
Activity
```

Everything is an Activity.

Never create:

SportEvent

CoffeeMeeting

HikingEvent

PartyEvent

LanguageClub

Instead:

```text
Activity

↓

Module

↓

Attributes
```

---

# Entity Map

```text
User
│
├── Identity
├── Profile
├── RLI
├── Trust
├── Community
├── Settings
├── Achievements
└── Notifications

Activity
│
├── Module
├── Category
├── Participants
├── Waiting List
├── Messages
├── Reports
├── Verification
├── Calendar
└── Media
```

---

# Main Tables

## Users

One record per person.

Fields

```text
id

display_name

username

avatar

bio

language

city_id

country

created_at

updated_at

deleted_at
```

---

## User Identities

One user may have many identities.

```text
Telegram

Google

Apple

Email

WhatsApp
```

Fields

```text
provider

provider_user_id

verified

last_login
```

---

## Cities

```text
id

country

name

timezone

latitude

longitude

active
```

---

## Modules

```text
Sport

Activities

Parties

Nature

Learning

Creative

Future
```

Administrator can add new modules.

No code changes required.

---

## Categories

Example

Sport

↓

Volleyball

Football

Padel

Basketball

---

Activities

↓

Coffee

Cinema

Bowling

Restaurant

---

Nature

↓

Hiking

Camping

Fishing

---

The hierarchy is configurable.

---

## Activities

This is the main business table.

```text
id

module_id

category_id

creator_id

title

description

start_time

end_time

city_id

location

latitude

longitude

visibility

status

max_participants

price

currency

created_at

updated_at
```

---

## Activity Attributes

Every module has custom fields.

Instead of changing Activities table

use

```text
ActivityAttribute

activity_id

attribute

value
```

Examples

Sport

```text
Skill = Intermediate

Players = 8

Court = Sand
```

Nature

```text
Distance = 18 km

Elevation = 640 m

Difficulty = Hard
```

Party

```text
DressCode = Casual

Music = Rock

AgeLimit = 18+
```

This makes modules extensible.

---

## Participants

```text
activity_id

user_id

status

joined_at

confirmed

checked_in

rating
```

---

## Waiting List

```text
activity_id

user_id

position

created_at
```

---

## Verification

Stores activity verification.

```text
activity_id

verification_level

completed

verified_at
```

---

## Participant Verification

Every participant confirms others.

```text
activity_id

from_user

to_user

status

created_at
```

---

## Location Verification

Optional.

```text
activity_id

user_id

verified

verification_time
```

Coordinates should never be stored permanently.

Only verification result.

---

## Chat

```text
activity_id

user_id

message

attachments

created_at
```

---

## Notifications

```text
user_id

type

title

text

status

created_at
```

---

## RLI History

Never store only current score.

Always keep history.

```text
user_id

activity_id

points

reason

created_at
```

---

## Trust History

```text
user_id

change

reason

created_at
```

---

## Community Score

```text
user_id

points

reason

created_at
```

---

## Referrals

```text
referrer

invited

status

reward

created_at
```

---

## Achievements

```text
user_id

achievement

level

created_at
```

---

## Reports

```text
activity

reporter

target

reason

status

created_at
```

---

## Media

```text
owner

type

url

created_at
```

---

# Event Lifecycle

Every Activity moves through the same lifecycle.

```text
Draft

↓

Published

↓

Searching Participants

↓

Full

↓

Started

↓

Completed

↓

Verification

↓

RLI Calculation

↓

Archived
```

Every state transition is recorded.

Never update silently.

---

# Audit Log

Every important action is stored.

Example

```text
User joined

User left

Activity updated

Location verified

Trust changed

RLI awarded
```

Nothing important should happen without history.

---

# Soft Delete

Nothing is permanently deleted.

Every entity supports

```text
deleted_at
```

Real deletion happens only through maintenance jobs.

---

# Scalability Rules

Every table:

Primary Key

Indexes

Timestamps

Soft Delete

Audit Support

---

# Database Rules

No duplicated information.

No module-specific tables unless absolutely necessary.

Everything should be configurable.

Everything should support internationalization.

Everything should support future modules.

---

# Final Principle

The database should describe the real world.

Not today's user interface.

If the UI changes,

the database should remain valid.

If the platform grows,

the database should already be ready.

---

# ⭐ CTO Note

The database is the most expensive part of the system to redesign.

Spend ten times more time designing it than coding it.

Every hour spent improving the data model saves dozens of hours of future development.

---

 позволит сделать так, чтобы GO IRL не выглядел как одно приложение с шестью вкладками, а как **единая платформа с шестью специализированными продуктами**, использующими общее ядро. На мой взгляд, это одна из самых сильных идей, к которой мы пришли сегодня.
