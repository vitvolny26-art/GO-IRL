# Adapters

## Purpose

Infrastructure integrations and external dependencies.

**Examples:**
- Database (Prisma)
- WebSocket transport
- Message queues
- Email service
- Telegram API

## Rule

Adapters implement ports. Nothing else depends on adapters directly.

## Who Depends on This?

Application services (through ports).

## Who This Depends On?

External libraries only.
