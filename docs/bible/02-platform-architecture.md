GO IRL Bible
Book II
Platform Architecture

Version 1.0

The Platform Philosophy

GO IRL is not an application.

GO IRL is a platform.

Applications come and go.

Platforms evolve.

Every architectural decision must increase the platform's ability to evolve.

Never optimize architecture for today's features.

Always optimize for tomorrow's possibilities.

The Core Principle

Everything belongs to the Platform Core.

Nothing belongs exclusively to Telegram.

Nothing belongs exclusively to Web.

Nothing belongs exclusively to Android.

Clients are replaceable.

The platform is permanent.

Architecture Overview
                    GO IRL Platform

        ┌──────────────────────────────┐
        │          Clients             │
        └──────────────────────────────┘

 Telegram Mini App

 Responsive Web

 Android

 iPhone

 Future Clients

                │

         REST API / WebSocket

                │

         Platform Backend

                │

        Platform Core Services

                │

 PostgreSQL (Supabase)

                │

       Event Bus / Queue

        ┌────────┴────────┐

        │                 │

       n8n         Background Workers

        │

 Telegram

 Email

 Push

 WhatsApp

 AI
Platform Core

The Core is the heart of GO IRL.

Every client depends on it.

The Core depends on nothing.

Core contains:

Authentication

Users

Activities

Participation

Notifications

Chat

Calendar

Achievements

Real Life Index

Trust Score

Community Score

Reports

Moderation

Admin

Referral

Search

Media

Clients

Clients never contain business logic.

Clients only:

display information

send commands

receive updates

Every client uses identical APIs.

Module System

GO IRL consists of independent modules.

Each module behaves like its own application.

GO IRL

↓

Sport

Activities

Parties

Nature

Learning

Creative

Future Modules

Every module owns:

UI

Filters

Cards

Forms

Recommendations

Navigation

Theme (optional)

But every module shares:

Authentication

Users

Activities

Notifications

Chat

Calendar

Trust

RLI

Referral

Achievements

Activity Model

Everything inside GO IRL is an Activity.

Never create different entities like:

SportEvent

PartyEvent

CoffeeMeeting

LanguageClub

Instead:

Activity

↓

Module

↓

Attributes

Example

Activity

Module = Sport

Type = Volleyball

Skill = Intermediate

Players = 8

Example

Activity

Module = Nature

Distance = 18 km

Difficulty = Hard

Elevation = 650 m

The platform stores one model.

Modules extend it.

Plugin Architecture

Each module is loaded independently.

Modules must not know about each other.

Communication happens only through Platform Core.

This allows adding new modules without rewriting existing ones.

Event Driven Design

Every important action generates an event.

Examples:

ActivityCreated

ParticipantJoined

ParticipantLeft

ActivityCancelled

ActivityCompleted

LocationVerified

TrustUpdated

RLIUpdated

ReferralCompleted

Modules react to events.

Not to direct method calls.

Backend

Backend owns:

Business rules

Permissions

Validation

Scoring

Recommendations

Matching

Notification scheduling

Never duplicate business rules in clients.

API First

Every feature starts with an API.

Only after API exists:

Frontend is implemented.

Telegram Bot is implemented.

Mobile apps are implemented.

Database First

Before writing code developers must design:

Entities

Relations

Indexes

Constraints

Security

Migrations

Only after database approval implementation begins.

Automation Layer

n8n never contains business logic.

n8n only reacts to events.

Examples:

Send reminders

Send Telegram messages

Generate reports

Sync calendar

Create AI summaries

Business decisions always remain inside Backend.

Authentication

Platform authentication is identity-based.

User

↓

Identities

Telegram

Google

Apple

Email

WhatsApp

Future Providers

One person.

One profile.

Many identities.

Security

Every request is authenticated.

Every action is authorized.

Every important action is logged.

Every permission is validated.

Never trust the client.

Scalability

Every component must scale independently.

Backend

Workers

Database

Notifications

Search

Media

No component should become a single point of failure.

Development Order

Every feature follows exactly the same sequence.

Business Problem

↓

Database

↓

API

↓

Backend

↓

Automation

↓

Frontend

↓

Testing

↓

Release

Never change this order.

The Architecture Rule

Whenever a developer asks:

"Where should this logic live?"

The answer is almost always:

Backend.

Final Principle

Clients are temporary.

Backend is permanent.

Data is forever.

Design accordingly.

CTO Note

Every line of code written for GO IRL should make the platform easier to extend, easier to maintain and easier to understand.

A feature that is difficult to extend is considered unfinished, even if it works.

The goal is not to build software that works today.

The goal is to build a platform that still feels well-designed ten years from now.
