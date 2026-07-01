# Sprint 0 — Verification Checklist

Цель: пройти этот список локально, по порядку. Каждый пункт — реальная
команда с реальным результатом. Никаких "по логике должно работать".

## 1. Окружение

```bash
node --version     # должно быть >= 20
corepack enable     # включает pnpm из packageManager в package.json
pnpm --version      # должно быть >= 8
```

## 2. Установка

```bash
pnpm install
```

**Ожидаемый результат:** зависимости установлены, `pnpm-lock.yaml` обновлён.

## 3. Typecheck (самый быстрый способ найти проблемы)

```bash
pnpm typecheck
```

Если падает — записывай **точный текст ошибки и файл**. Не пересказывай
своими словами, копируй вывод терминала целиком.

## 4. Build

```bash
pnpm build
```

Порядок сборки управляется turbo: `packages/types` → `packages/contracts`,
`packages/shared` → `backend`, `apps/*`.

## 5. Lint

```bash
pnpm lint
```

## 6. Запуск backend

```bash
pnpm --filter @go-irl/backend dev
```

Открой `http://localhost:3000/health` — должен вернуться:
```json
{ "status": "ok" }
```

## 7. Запуск Telegram Mini App

```bash
pnpm --filter @go-irl/telegram-miniapp dev
```

Открой `http://localhost:5173` — должна отрисоваться тёмная страница приложения.

## 8. Docker

```bash
cd infra/docker
docker-compose up -d postgres
```

Для сборки backend контейнера:
```bash
docker build -f infra/docker/Dockerfile.backend -t goirl-backend .
docker run -p 3000:3000 goirl-backend
curl http://localhost:3000/health
```

---

## Журнал аудита

| # | Пункт | Статус | Примечание |
|---|-------|--------|------------|
| 1 | packages/types — реальные типы | ✅ добавлено | activity.ts, user.ts |
| 2 | packages/shared — тема и константы | ✅ добавлено | theme.ts, constants.ts |
| 3 | packages/contracts — API контракты | ✅ добавлено | auth.ts, sport.ts |
| 4 | exports/types/main в пакетах | ✅ исправлено | добавлено поле exports в types/shared/contracts |
| 5 | tsconfig.base.json | ✅ добавлено | пакеты наследуют base конфиг |
| 6 | turbo typecheck task | ✅ добавлено | в pipeline |
| 7 | apps/telegram-miniapp — build файлы | ✅ добавлено | index.html, vite.config.ts, tsconfig.json, main.tsx |
| 8 | apps/web — базовые файлы | ✅ добавлено | index.html, vite.config.ts, tsconfig.json, App.tsx, main.tsx |
| 9 | infra/docker — улучшенный Dockerfile | ✅ добавлено | turbo prune подход |
| 10 | Backend (Fastify + Prisma) | ✅ сохранено | более продвинутый чем в архиве |
