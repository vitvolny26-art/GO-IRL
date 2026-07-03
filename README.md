# GO IRL Telegram Mini App

Кликабельный MVP универсальной платформы для офлайн-активностей в Olomouc.

## Запуск

```powershell
npm install
npm run dev
```

После запуска открой адрес, который покажет Vite (обычно `http://127.0.0.1:5173`).

## Реализовано в прототипе

- универсальная сущность Activity;
- категории спорта, активностей, вечеринок, природы и общения;
- ближайшие, популярные и срочные события;
- «Удиви меня»;
- создание события;
- присоединение, выход и waiting list;
- карточка события и системный share;
- профиль, RLI, карта жизни и достижения;
- русский и чешский языки;
- Telegram WebApp bootstrap;
- dark mode.

Данные пока хранятся локально в браузере через Zustand persist. Для production нужны backend Fastify, PostgreSQL/Supabase, Telegram initData validation, REST API/WebSocket, bot и n8n workflows.
