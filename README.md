# GO IRL

**Go outside. Meet people. Live more.**

GO IRL is a social coordination platform that helps people organize real-life activities and build genuine connections.

**Current status:** Sprint 0 complete — foundation ready. Sprint 1 (MLP) pending architecture review.

## Quick Start

**Requirements:** Node.js ≥ 20, pnpm ≥ 8, Docker (for local PostgreSQL)

```bash
# Install dependencies
pnpm install

# Start local database
docker compose up -d postgres

# Copy environment variables
cp .env.example .env
# Fill in TELEGRAM_BOT_TOKEN and DATABASE_URL in .env

# Generate Prisma client and run migrations
cd backend && pnpm run db:generate

# Start development server
pnpm dev
```

## CI Commands

```bash
pnpm lint          # ESLint across all packages
pnpm typecheck     # TypeScript --noEmit across all packages
pnpm build         # Build all packages
pnpm format:check  # Prettier format check
```

## Architecture

See [docs/02-ARCHITECTURE.md](docs/02-ARCHITECTURE.md) for system design.

Platform-first architecture: all business logic lives in `backend/src/platform/`.
HTTP routes in `backend/src/adapters/http/` are thin wrappers only.

## Documentation

| File | Description |
|------|-------------|
| [docs/01-VISION.md](docs/01-VISION.md) | Why GO IRL exists |
| [docs/02-ARCHITECTURE.md](docs/02-ARCHITECTURE.md) | System design |
| [docs/03-DATABASE.md](docs/03-DATABASE.md) | Data model |
| [docs/04-API.md](docs/04-API.md) | API contract |
| [ROADMAP.md](ROADMAP.md) | Sprint plan |
| [CHANGELOG.md](CHANGELOG.md) | Technical changelog |
| [BACKLOG.md](BACKLOG.md) | Upcoming work |
| [RELEASE_NOTES.md](RELEASE_NOTES.md) | Release notes |

## Repository Structure

```
GO-IRL/
├─ .github/          CI workflows
├─ .ai/              AI context and audit reports
├─ docs/             Documentation and ADRs
├─ backend/          Fastify API + Prisma (platform-first)
│  ├─ src/platform/  Business logic (pure)
│  ├─ src/adapters/  HTTP routes (thin)
│  └─ prisma/        Schema and seed
├─ packages/         Shared libraries (types, contracts, shared)
├─ apps/             Delivery platforms
│  ├─ telegram-miniapp/  React + Vite Telegram MiniApp
│  └─ web/               Web app (placeholder)
├─ infra/            Docker infrastructure
├─ supabase/         Database configuration (future)
└─ scripts/          Development scripts
```

## North Star Metric

**Confirmed Real-Life Meetings**

Not DAU. Not session time. Only meetings that actually happened, verified.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

MIT
