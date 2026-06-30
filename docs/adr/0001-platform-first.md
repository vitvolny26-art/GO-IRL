# ADR-0001: Platform First

**Date:** 2026-06-28
**Status:** Accepted

## Context

GO IRL needs to support multiple product verticals (Sport, Nature, Learning, Creative) without hardcoding each one into the platform.

Future verticals should be addable with minimal platform changes.

## Decision

Architecture is split into two layers:

### Platform (Core)

Universal services:
- Identity
- Activity
- Participation
- Communication
- Trust
- Reputation
- Discovery
- Scheduling

### Product Modules

Vertical contexts:
- Sport
- Nature
- Learning
- Creative
- (Future)

**Rule:** Product modules depend on Platform. Platform never depends on Product modules.

## Alternatives Considered

1. Monolithic — all verticals in one service (tight coupling)
2. Microservices — each vertical independent (premature complexity)
3. **Platform + Modules** — clear separation, easy to extend

## Trade-offs

✅ Easy to add new verticals
✅ Clear boundaries
✅ Platform improvements benefit all modules
❌ Initial setup more complex than monolithic

## Consequences

- New verticals require minimal platform changes
- Platform changes must consider all dependents
- Testing becomes more complex but more valuable

## Future Revisions

If horizontal scaling becomes critical, modules could become independent services.

But architecture remains valid.
