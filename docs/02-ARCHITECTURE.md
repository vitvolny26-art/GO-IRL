# Architecture: GO IRL

## System Overview

GO IRL is built on three core communication patterns:

### 1. REST
CRUD operations, queries, resource management.

### 2. WebSocket
Real-time updates, presence, chat, live activity changes.

### 3. Domain Events
Communication inside the platform, automation, integration, future scalability.

## Architecture Layers

```
API (Delivery)
  ↓
Application (Services)
  ↓
Domain (Business Logic)
  ↓
Ports (Interfaces)
  ↓
Adapters (Infrastructure)
```

## Bounded Contexts

### Platform (Core)

Universal services used by all product modules:

- **Identity** — Authentication and authorization
- **Activity** — Core activity lifecycle
- **Participation** — Joining and managing participants
- **Communication** — Chat and messaging
- **Trust** — Trust scoring and verification
- **Reputation** — User reputation system
- **Discovery** — Activity search and recommendations
- **Scheduling** — Calendar and time management

### Product Modules

Vertical business contexts:

- **Sport** — Sports activities
- **Nature** — Outdoor activities
- **Learning** — Educational activities
- **Creative** — Creative activities
- *(Future)* — Additional verticals

**During Sprint 1–3:** All modules may temporarily share UI components until validated by users.

## Communication Pattern

```
Product Module
    ↓
Domain Event
    ↓
Event Bus
    ↓
Event Handlers
    ↓
Notification Service
    ↓
Delivery Channels (WebSocket, Telegram, Email, Push)
```

**Key Principle:** Modules never call each other directly. They communicate only through Domain Events.

## Deployment

- **Backend:** Node.js + Fastify + TypeScript
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Realtime:** WebSocket (Fastify WebSocket)

## See Also

- [adr/0001-platform-first.md](adr/0001-platform-first.md) — Why Platform First
- [adr/0002-monorepo.md](adr/0002-monorepo.md) — Why Monorepo
- [adr/0003-activity-model.md](adr/0003-activity-model.md) — Activity Model
- [adr/0004-event-driven.md](adr/0004-event-driven.md) — Event Driven Architecture
