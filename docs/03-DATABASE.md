# Database: GO IRL

## Strategy

**Database First**

Schema is designed before implementation. All changes are versioned through migrations.

## Technology

- **PostgreSQL** via Supabase
- **Prisma** as ORM
- **Migrations** version controlled in `prisma/migrations/`

## Core Entities

See detailed schema in `prisma/schema.prisma`.

## Seeding

Initial data for development and testing via `prisma/seed.ts`.

## Guidelines

1. All schema changes through migrations
2. No manual production changes
3. Every modification must be reversible
4. Seed data for consistent development environment

## See Also

- [adr/0008-database-first.md](adr/0008-database-first.md) — Database First
- [adr/0009-prisma.md](adr/0009-prisma.md) — Prisma ORM
