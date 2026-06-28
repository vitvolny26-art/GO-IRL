# API: GO IRL

## Contract-First

API contracts are defined before implementation.

## Patterns

### REST

Standard HTTP methods for CRUD operations.

```
GET    /api/activities              (list)
POST   /api/activities              (create)
GET    /api/activities/:id          (read)
PATCH  /api/activities/:id          (update)
DELETE /api/activities/:id          (delete)
```

### WebSocket

Real-time subscriptions and broadcasts.

```
ws://api.goirl.io/ws

Subscribe: { action: "subscribe", channel: "activity:123" }
Broadcast: { type: "activity.updated", data: {...} }
```

## Response Format

All responses follow standard structure:

```json
{
  "success": true,
  "data": {...},
  "error": null
}
```

## Authentication

Telegram OAuth2 token-based.

## See Also

- [adr/0007-api-first.md](adr/0007-api-first.md) — API First
- [adr/0010-websocket-transport.md](adr/0010-websocket-transport.md) — WebSocket
