# GO IRL Architecture Rules

## Frozen Decisions

These DO NOT change until MVP is released:

✅ Monorepo + pnpm
✅ Platform First
✅ Product Modules
✅ Event Driven Architecture
✅ Activity as primary entity
✅ REST + WebSocket
✅ Prisma + PostgreSQL
✅ ADR + RFC process
✅ Telegram OAuth

## Architecture Budget

- **Sprint 0:** 20% architecture, 80% implementation
- **Sprint 1+:** 10% architecture, 90% product

## New Ideas?

If during sprint:
1. Add to docs/rfc/
2. Discuss at sprint planning only
3. Never interrupt active sprint

## Decision Escalation

Escalate if:
- Changes product behavior
- Changes architecture
- Affects long-term scalability
- Multiple valid approaches exist

Otherwise: Use engineering judgment.

## Repository Structure Rules

```
backend/           Only HTTP server + composition root
platform/          Universal services (Identity, Activity, etc.)
product/           Verticals (Sport, Nature, Learning, Creative)
packages/          Reusable libraries
apps/              Delivery platforms (Telegram, Web)
```

**Rule:** Folder appears when code appears. No placeholders.

## Dependency Direction

```
API
  ↓
Application
  ↓
Domain
  ↓
Ports
  ↓
Adapters
```

Never reverse.

## Event Bus Rules

1. Services emit Domain Events
2. Event Bus publishes them
3. Event Handlers subscribe
4. Never direct service calls
5. Event Bus knows nothing about WebSocket or Telegram

## Platform vs Product

**Platform** (core):
- Identity
- Activity
- Participation
- Communication
- Trust
- Reputation
- Discovery
- Scheduling

**Product** (verticals):
- Sport
- Nature
- Learning
- Creative
- (Future)

Rule: Product depends on Platform. Platform never depends on Product.

## Testing Strategy

Tests are part of feature definition, not an afterthought.

- Unit tests colocated with code
- Integration tests in __tests__/
- E2E tests at repository root

## Documentation

Every folder has README answering:
1. Why does this exist?
2. Who owns it?
3. Who depends on it?
4. Who must never depend on it?

## Code Quality

- TypeScript strict mode
- ESLint + Prettier
- Conventional commits
- No commented code
- No TODOs without issue reference
- Every exported function documented

## Metrics

Measure:
✅ Confirmed meetings
✅ User retention
✅ Activity creation rate

Don't measure:
❌ Session duration
❌ DAU (not relevant for coordinate-offline app)
❌ Screen time (counter to mission)
