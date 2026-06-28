# ADR-0004: Event Driven Architecture

**Date:** 2026-06-28
**Status:** Accepted

## Context

GO IRL is a real-time platform with many concurrent events:
- User joins activity
- Activity starts/ends
- Chat message received
- Verification completed
- Trust score updated

Modules need to communicate without tight coupling.

## Decision

Domain Event Bus pattern:

```
Service (Platform or Module)
  ↓ emits
Domain Event
  ↓ published to
Event Bus (abstraction)
  ↓ subscribed by
Event Handlers
  ↓ trigger
Notifications (WebSocket, Telegram, Email, etc.)
```

**Key Rule:** Event Bus never knows about WebSocket or delivery channels. That's Notification Service's job.

## Alternatives Considered

1. Direct service calls (tight coupling)
2. **Event Bus + Domain Events** (loose coupling)
3. Message queue from day 1 (premature optimization)

## Trade-offs

✅ Loose coupling
✅ Easy to add handlers
✅ Can evolve to distributed events
❌ Slightly more complex than direct calls

## Consequences

- Modules communicate through events only
- Event Bus starts as in-process, can become distributed
- Platform handles event registration
- Tests use events as first-class objects

## Future Revisions

Phase 1: In-process Event Bus
Phase 2: Redis Pub/Sub
Phase 3: Kafka or RabbitMQ

Backend code doesn't change.
