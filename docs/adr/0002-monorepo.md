# ADR-0002: Monorepo

**Date:** 2026-06-28
**Status:** Accepted

## Context

GO IRL has multiple packages, apps, and services that share code and types.

Multiple repositories would create:
- Versioning complexity
- Duplicate code
- Coordination overhead

## Decision

Single repository (monorepo) with pnpm workspaces.

```
apps/
backend/
packages/
supabase/
```

Each is a workspace package managed by pnpm.

## Alternatives Considered

1. Multiple repositories — high coordination cost
2. **Monorepo + pnpm** — simple, fast, shared types
3. Monolith — everything in one package

## Trade-offs

✅ Shared types and utilities
✅ Single dependency tree
✅ Atomic commits
❌ Requires discipline (clear boundaries)

## Consequences

- Fast CI/CD (shared cache)
- Easy code sharing
- Easier onboarding
- Requires clear module boundaries

## Future Revisions

If scaling requires multiple repositories, can split at workspace boundaries without major refactoring.
