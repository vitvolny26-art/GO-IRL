# Apps

Delivery platforms for GO IRL.

## Apps

- `telegram-miniapp/` — Telegram Mini App
- `web/` — Web application
- *(future)* `mobile/` — Mobile apps

## Rule

Each app:
- Depends on Backend API
- Shares types from `@go-irl/types`
- Is independently deployable
- Has its own `package.json`

## Starting

```bash
cd apps/telegram-miniapp
pnpm install
pnpm run dev
```
