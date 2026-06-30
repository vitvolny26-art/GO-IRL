# GO IRL Backend

## Purpose

HTTP API server for GO IRL platform.

**Who owns it:** Backend Team
**Who depends on it:** Apps (Telegram Mini App, Web, Mobile)
**Who must not depend on it:** Frontend code

## Structure

```
src/
├─ main.ts              Entry point
├─ bootstrap.ts         Dependency injection
├─ platform/            Core services (Identity, Activity, etc.)
├─ product/             Vertical modules (Sport, Nature, etc.)
├─ shared/              Cross-cutting concerns
└─ adapters/            Infrastructure (Database, WebSocket, etc.)
```

## Starting

```bash
pnpm install
pnpm run dev
```

Server starts on `http://localhost:3000`.

## Architecture

See [../../docs/02-ARCHITECTURE.md](../../docs/02-ARCHITECTURE.md).

## API Contracts

See [../../docs/04-API.md](../../docs/04-API.md).
