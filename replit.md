# GO IRL

Telegram Mini App для локальных real-life событий. Главный цикл: создать → поделиться → присоединиться → чат → пришли → повторили. Фокус на Оломоуц, спортивные события.

## Run & Operate

- `pnpm --filter @workspace/go-irl run dev` — запустить фронтенд (Vite, port 22671)
- `pnpm --filter @workspace/api-server run dev` — запустить API сервер (port 5000)
- `pnpm run typecheck` — полная проверка типов

## Stack

- React + TypeScript + Vite + pnpm workspaces
- Supabase (база + auth)
- @tanstack/react-query, zustand
- Telegram Mini App API
- i18n: RU / UK / CS / EN

## Where things live

- `artifacts/go-irl/src/` — весь frontend код (из github.com/vitvolny26-art/GO-IRL)
- `artifacts/go-irl/src/App.tsx` — root component
- `artifacts/go-irl/src/i18n.ts` — переводы RU/UK/CS/EN
- `artifacts/go-irl/src/supabase.ts` — Supabase client
- `artifacts/go-irl/src/styles.css` — глобальные стили
- `artifacts/go-irl/public/brand/` — логотипы, brand assets

## Env vars (shared)

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon key
- `VITE_TELEGRAM_BOT_USERNAME` — имя Telegram бота (без @)

## Задачи (приоритет)

1. ✅ Убрать встроенную Google карту → адрес + кнопка Google Maps
2. ✅ Проверить переводы RU/UK/CS/EN — найден и исправлен баг: `sportSkillMatch` во всех 4 языках был русский текст
3. ✅ Убрать технические слова — `pending` только в коде, `Skill match` удалён, `Indoor/Outdoor` локализованы
4. ✅ Заменить window.alert на toast — `showNotice()` + `onNotice` prop в ActivitySheet/SportActivitySheet
5. Сделать feedback form
6. ✅ /join/:id landing page с Open Graph — API сервер `/join/:id`, OG теги, редирект в Telegram
7. Проверить chat expiry (событие + 24ч)
8. Тесты create/join/share/chat/coach

## User preferences

- Короткие ответы, без длинных объяснений
- Минимальные патчи, не трогать много файлов
- Всегда проверять lint/build после изменений
