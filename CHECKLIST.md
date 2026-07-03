# Полный аудит репозитория — Локальный чеклист

Выполни команды в порядке ниже. Все результаты скопируй с полным выводом.

---

## 1. GIT

### 1.1 Статус репозитория
```bash
git status
```
**Что проверяет:** Рабочее дерево, несохранённые изменения, ветка  
**Успех:** `working tree clean`, `on branch refactor/sprint-0-lite` или `main`  
**Ошибка:** `Changes not staged`, `Untracked files`, конфликты слияния  

### 1.2 Логирование коммитов
```bash
git log --oneline -10
```
**Что проверяет:** История коммитов, структура ветвления  
**Успех:** Минимум 3 коммита, понятные сообщения  
**Ошибка:** Пустая история, странные сообщения  

### 1.3 Проверка удалённых веток
```bash
git branch -a
```
**Что проверяет:** Доступные ветки локально и на удалённом  
**Успех:** `refactor/sprint-0-lite`, `main`, `origin/*`  
**Ошибка:** Потеря веток, конфликты именования  

### 1.4 Различие между ветками
```bash
git diff main refactor/sprint-0-lite
```
**Что проверяет:** Что изменилось между main и рабочей веткой  
**Успех:** Видны удалённые Dockerfile и изменённый docker-compose.yml  
**Ошибка:** Нет различий, неожиданные изменения  

---

## 2. PNPM

### 2.1 Версия pnpm
```bash
pnpm --version
```
**Что проверяет:** Установлена ли pnpm, какая версия  
**Успех:** Версия ≥ 8.0.0  
**Ошибка:** pnpm не найдена, версия < 8.0.0  

### 2.2 Установка зависимостей
```bash
pnpm install
```
**Что проверяет:** Загружаются ли зависимости, валиден ли package.json  
**Успех:** `dependencies resolved`, `node_modules/ created`, `pnpm-lock.yaml` обновлён  
**Ошибка:** `ERR!`, `ENOENT`, `404 not found`, конфликты разрешений  

### 2.3 Проверка workspace
```bash
pnpm ls -r --depth=0
```
**Что проверяет:** Структура monorepo, наличие пакетов  
**Успех:** Перечислены все пакеты (backend, apps/telegram-miniapp, etc.)  
**Ошибка:** `no packages found`, ошибки парсинга pnpm-workspace.yaml  

### 2.4 Проверка скриптов
```bash
pnpm run
```
**Что проверяет:** Доступные npm скрипты  
**Успех:** Выведены build, lint, format, dev, test  
**Ошибка:** Скрипты отсутствуют, неопознанные команды  

---

## 3. TYPESCRIPT

### 3.1 Версия TypeScript
```bash
pnpm exec tsc --version
```
**Что проверяет:** Установлена ли TypeScript, какая версия  
**Успех:** Версия ≥ 5.0.0  
**Ошибка:** tsc не найдена, версия < 5.0.0  

### 3.2 Проверка типов без компиляции
```bash
pnpm exec tsc --noEmit
```
**Что проверяет:** Синтаксические и типовые ошибки TypeScript  
**Успех:** Нет вывода (exit code 0)  
**Ошибка:** `error TS****:`, указаны файлы с ошибками, exit code != 0  

### 3.3 Компиляция TypeScript
```bash
pnpm run build
```
**Что проверяет:** Полная сборка всех пакетов TypeScript  
**Успех:** `dist/` папки созданы, no errors, exit code 0  
**Ошибка:** ошибки компиляции, пропущенные зависимости, exit code != 0  

---

## 4. DOCKER

### 4.1 Версия Docker
```bash
docker --version
```
**Что проверяет:** Установлен ли Docker  
**Успех:** Version ≥ 20.10.0  
**Ошибка:** Docker не найден или версия старая  

### 4.2 Проверка доступа к Docker daemon
```bash
docker ps
```
**Что проверяет:** Доступ к Docker daemon  
**Успех:** Список контейнеров (может быть пустой), exit code 0  
**Ошибка:** `Cannot connect to Docker daemon`, `permission denied`, exit code != 0  

### 4.3 Проверка docker-compose синтаксиса
```bash
docker-compose config
```
**Что проверяет:** Валидность YAML, переменные окружения  
**Успех:** Выведена полная конфигурация, exit code 0  
**Ошибка:** `yaml parse error`, `undefined variable`, `service not found`, exit code != 0  

### 4.4 Версия docker-compose
```bash
docker-compose --version
```
**Что проверяет:** Установлена ли docker-compose  
**Успех:** Version ≥ 1.29.0 или Docker Compose V2  
**Ошибка:** docker-compose не найдена, версия старая  

---

## 5. DOCKER COMPOSE

### 5.1 Pull образов
```bash
docker-compose pull
```
**Что проверяет:** Загружаются ли образы (postgres, n8n)  
**Успех:** `Pulling postgres`, `Pulling n8n`, `Digest`, exit code 0  
**Ошибка:** `image not found`, `connection refused`, `permission denied`, exit code != 0  

### 5.2 Build образов (если есть Dockerfile)
```bash
docker-compose build
```
**Что проверяет:** Собираются ли пользовательские образы  
**Успех:** `Building`, `Successfully tagged`, exit code 0  
**Ошибка:** `Dockerfile not found`, ошибки сборки, exit code != 0  

### 5.3 Валидация сетей и томов
```bash
docker network ls && docker volume ls
```
**Что проверяет:** Существуют ли сети и тома из docker-compose  
**Успех:** Не требуется (проверка информационная)  
**Ошибка:** Не требуется (проверка информационная)  

### 5.4 Запуск сервисов (без detach)
```bash
timeout 30 docker-compose up
```
**Что проверяет:** Запускаются ли postgres и n8n, нет ошибок инициализации  
**Успех:** `postgres_1 | ... ready to accept connections`, `n8n_1 | ... started successfully`, ctrl+c graceful shutdown  
**Ошибка:** `Error response from daemon`, порт занят, сервис крашится, timeout  

### 5.5 Проверка здоровья сервисов (после успешного запуска)
```bash
docker-compose ps
```
**Что проверяет:** Статусы контейнеров  
**Успех:** `postgres | Up (healthy)`, `n8n | Up (healthy)`, exit code 0  
**Ошибка:** `Exit (1)`, `Restarting`, `Unhealthy`, exit code != 0  

### 5.6 Остановка сервисов
```bash
docker-compose down -v
```
**Что проверяет:** Cleanly останавливаются ли сервисы, удаляются ли тома  
**Успех:** `Removing go-irl-*`, `Removing network`, `Removing volume`, exit code 0  
**Ошибка:** `Error response`, `permission denied`, exit code != 0  

---

## 6. PRISMA

### 6.1 Версия Prisma
```bash
pnpm exec prisma --version
```
**Что проверяет:** Установлена ли Prisma  
**Успех:** Версия ≥ 5.0.0  
**Ошибка:** prisma не найдена, версия < 5.0.0  

### 6.2 Проверка schema.prisma
```bash
pnpm exec prisma validate
```
**Что проверяет:** Синтаксис и валидность schema.prisma  
**Успех:** `✓ Your schema.prisma is valid`, exit code 0  
**Ошибка:** `Datasource "db": Parse errors`, `Model validation error`, exit code != 0  

### 6.3 Генерация Prisma Client
```bash
pnpm exec prisma generate
```
**Что проверяет:** Генерируется ли клиент из schema  
**Успех:** `✓ Generated Prisma Client`, `node_modules/.prisma/client` создан  
**Ошибка:** ошибки парсинга schema, конфликты типов, exit code != 0  

### 6.4 Проверка миграций
```bash
pnpm exec prisma migrate status
```
**Что проверяет:** Статус миграций БД  
**Успех:** `No migration found`, или список примененных миграций  
**Ошибка:** `Environment variables not found`, `database not found`, exit code != 0  

---

## 7. TURBO

### 7.1 Версия Turbo
```bash
pnpm exec turbo --version
```
**Что проверяет:** Установлена ли Turbo  
**Успех:** Версия ≥ 1.0.0  
**Ошибка:** turbo не найдена, версия < 1.0.0  

### 7.2 Анализ граф задач
```bash
pnpm exec turbo build --dry
```
**Что проверяет:** Построен ли граф сборки, валидна ли конфигурация  
**Успех:** Выведены все tasks в порядке зависимостей, exit code 0  
**Ошибка:** `Configuration error`, циклические зависимости, exit code != 0  

### 7.3 Полная сборка через Turbo
```bash
pnpm exec turbo build
```
**Что проверяет:** Собираются ли все пакеты в правильном порядке  
**Успех:** `backend build`, `apps/telegram-miniapp build`, `PASS`, exit code 0  
**Ошибка:** ошибки сборки пакетов, зависимости не разрешены, exit code != 0  

---

## 8. GITHUB ACTIONS

### 8.1 Проверка синтаксиса workflow файлов
```bash
find .github/workflows -name "*.yml" -o -name "*.yaml" | xargs -I {} sh -c 'echo "Checking {}:" && cat {}'
```
**Что проверяет:** Наличие workflow файлов, их содержимое  
**Успех:** Файлы существуют, YAML синтаксис валиден  
**Ошибка:** Файлы не найдены, YAML ошибки, неправильные job names  

### 8.2 Проверка матрицы jobs (если есть)
```bash
cat .github/workflows/*.yml | grep -A 10 "jobs:"
```
**Что проверяет:** Структура jobs, dependencies  
**Успех:** Видны lint, build, test jobs, правильные зависимости  
**Ошибка:** Циклические зависимости, неправильные имена jobs  

---

## Порядок выполнения

1. Git (разберись с историей)
2. PNPM (установи зависимости)
3. TypeScript (проверь типы)
4. Docker (убедись что доступен)
5. Docker Compose (проверь конфигурацию)
6. Prisma (если используется БД)
7. Turbo (если используется)
8. GitHub Actions (если есть workflows)

**Результат:** Скопируй полный вывод каждой команды в отдельный файл или сообщение.
