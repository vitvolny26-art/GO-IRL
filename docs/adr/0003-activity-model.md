# ADR-0003: Activity Model

**Date:** 2026-06-28
**Status:** Accepted

## Context

Activity is the core entity in GO IRL.

It must support:
- Multiple types (Sport, Nature, Learning, Creative)
- Flexible scheduling (one-time, recurring)
- Capacity management
- Location-based queries
- Trust verification

## Decision

Activity is a single entity in Platform with:

```typescript
Activity {
  id: UUID
  createdBy: User
  title: string
  description: string
  type: string (e.g., "sport.volleyball")
  location: Point (lat, lon)
  startTime: DateTime
  endTime: DateTime
  maxParticipants: number
  minTrustScore: number
  status: "draft" | "published" | "started" | "completed" | "cancelled"
  metadata: JSON (flexible fields per vertical)
}
```

Product modules extend Activity through metadata, not inheritance.

## Alternatives Considered

1. Separate entity per vertical (tight coupling)
2. **Single Activity + metadata** (flexible)
3. Inheritance (complex queries)

## Trade-offs

✅ Single query interface
✅ Easy to add new types
✅ Platform handles all verticals
❌ Metadata validation per type

## Consequences

- All activities discoverable in one place
- Verticals define metadata schema
- Search works across all types

## Future Revisions

If query complexity grows, could introduce Activity subtypes with inheritance.

But current model serves MVP well.
