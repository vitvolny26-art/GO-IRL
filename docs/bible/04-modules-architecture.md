> ⚠️ **HISTORICAL BIBLE DRAFT / FUTURE MODULE VISION**
>
> This module architecture chapter is preserved as long-term platform thinking, but it is **not** the current beta implementation plan.
>
> Current beta scope is controlled by:
> - `docs/MARKET_POSITIONING.md`
> - `docs/COMPETITOR_WATCH.md`
> - `ROADMAP.md`
> - `BACKLOG.md`
>
> Anything below that implies full module registry, Parties, Nature, Learning, Creative, AI module layer, cross-module intelligence, personalized navigation, or broad platform modules must be treated as **future / not current MVP** unless explicitly re-approved.
>
> Current beta focus: Olomouc, Telegram-first local micro-meetups, six categories, create -> share -> join -> chat -> real attendance.


# GO IRL Bible

## Book IV — Modules

### 05 — Modules Architecture

Version 1.0

---

# Philosophy

GO IRL is **not one application**.

GO IRL is **one platform containing multiple specialized applications**.

Every module solves a different problem.

Every module has different users.

Every module requires different UX.

Trying to force them into one interface creates a poor experience.

Therefore every module is treated as an independent product sharing one Platform Core.

---

# Platform Structure

```text
GO IRL

Platform Core
│
├── Sport
├── Activities
├── Parties
├── Nature
├── Learning
├── Creative
└── Future Modules
```

Every module owns its UX.

The Platform owns the infrastructure.

---

# Shared Platform Core

Every module automatically receives:

* Authentication
* User Profiles
* Notifications
* Chat
* Calendar
* RLI
* Trust Score
* Community Score
* Referral System
* Search
* Maps
* Reporting
* Admin
* AI
* Media

Modules never implement these features themselves.

---

# Module Independence

Each module defines:

* Home Screen
* Search
* Filters
* Event Card
* Event Details
* Event Creation Wizard
* Recommendation Engine
* Icons
* Empty States

Changing one module must never affect another.

---

# SPORT MODULE

## Goal

Find people to play sports today.

---

## Main Screen

Instead of categories, users immediately see available games.

Example:

```
🏐 Volleyball

Today

18:00

Olomouc

5 / 8 Players

Need 3 more
```

---

## Filters

Sport

Skill level

Indoor / Outdoor

Free / Paid

Distance

Time

Urgent

Gender (optional)

Age (optional)

---

## Event Creation

Required fields:

Sport

Skill

Players Needed

Court

Equipment

Price

Visibility

---

## Card Design

Very compact.

Shows:

Players

Time

Distance

Price

Skill

Urgency

---

## Recommendation

Recommend based on:

favorite sports

previous games

friends

distance

skill

---

# ACTIVITIES MODULE

## Goal

Find people for casual social activities.

Examples:

Coffee

Cinema

Bowling

Board Games

Shopping

Dinner

---

## Main Screen

Activity cards.

Large images.

Mood-based browsing.

---

## Filters

Today

Tonight

Weekend

Indoor

Outdoor

Free

Paid

---

## Event Card

Shows:

Photo

People count

Mood

Location

Duration

---

## Recommendation

Based on interests.

Not previous sports.

---

# PARTIES MODULE

## Goal

Discover nightlife.

---

Different visual identity.

Dark mode.

Large covers.

Music-oriented.

---

Filters:

Music

Age

Entry Fee

Dress Code

Friends Going

---

Cards emphasize atmosphere.

---

# NATURE MODULE

## Goal

Organize outdoor adventures.

---

Main screen is map-first.

Users browse routes.

---

Filters

Distance

Elevation

Difficulty

Weather

Pets allowed

Kids friendly

Camping

---

Activity contains:

GPX route

Meeting point

Equipment list

Emergency contact

---

# LEARNING MODULE

Purpose:

Meet people while learning.

Examples:

Language Exchange

Programming

Photography

Cooking

Book Club

Networking

---

Filters

Topic

Language

Experience

Free/Paid

Online preparation

Offline meeting

---

Cards highlight knowledge.

Not entertainment.

---

# CREATIVE MODULE

Examples:

Drawing

Music

Dance

Painting

Photography

Pottery

Theatre

---

Visual design inspired by galleries.

Large images.

Minimal text.

---

# FUTURE MODULES

Platform must support adding completely new modules.

Without modifying Platform Core.

Examples:

Travel

Business Networking

Gaming LAN

Volunteering

Parents & Kids

Pets

Cars

Cycling

Motorcycles

Running Clubs

Startup Meetups

Charity

Religion

University

Health

---

# Module Registration

Every module is registered.

```
Module

id

name

icon

theme

route

status

permissions

version
```

Modules can be enabled or disabled.

---

# Dynamic Home Screen

Users choose favorite modules.

Home adapts.

A sports enthusiast sees Sport first.

A traveler sees Nature.

A student sees Learning.

The platform personalizes navigation.

---

# Cross Module Intelligence

Platform learns.

Example:

User likes hiking.

AI recommends camping.

Camping recommends photography.

Photography recommends travel.

The platform expands interests.

Not only repeats them.

---

# AI Module Layer

Each module has its own AI prompts.

Sport AI

Activities AI

Nature AI

Learning AI

Creative AI

Different prompts.

Same AI engine.

---

# UX Principle

Never reuse screens between modules if user expectations are different.

Shared backend.

Independent experience.

---

# CTO Rule

Modules compete for user attention.

Platform connects them.

If every module feels like the best application in its category,

the Platform succeeds.

---

# Founder Note

Users should never feel they are inside one giant application.

They should feel they entered a space designed specifically for what they want to do today.

Sport should feel like a sports app.

Nature should feel like a hiking app.

Learning should feel like a learning community.

Parties should feel like an event discovery platform.

Yet behind the scenes they all belong to one ecosystem.

That is the essence of GO IRL.

---
