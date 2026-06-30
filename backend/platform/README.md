# Platform Services

## Purpose

Core services shared across all product verticals.

**Domains:**
- Identity (authentication, authorization)
- Activity (activity lifecycle)
- Participation (joining, managing participants)
- Communication (chat, messaging)
- Trust (trust scoring, verification)
- Reputation (user reputation)
- Discovery (search, recommendations)
- Scheduling (calendar, time management)

## Structure

Each domain has:
- `domain/` — Business logic
- `application/` — Services
- `ports/` — Interfaces
- `adapters/` — Infrastructure

## Who Depends on This?

All product modules.

## Who This Depends On?

Nothing. This is the foundation.
