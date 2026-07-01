# Telegram Mini App Dockerfile
# Multi-stage build for production-ready image

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY pnpm-workspace.yaml .
COPY package.json .
COPY apps/telegram-miniapp/package.json apps/telegram-miniapp/
COPY packages/types/package.json packages/types/
COPY packages/shared/package.json packages/shared/
COPY packages/contracts/package.json packages/contracts/

RUN npm install -g pnpm@8.10.0 && \
    pnpm install --frozen-lockfile

# Build Telegram Mini App
COPY tsconfig.json .
COPY tsconfig.base.json .
COPY packages/ packages/
COPY apps/telegram-miniapp/ apps/telegram-miniapp/

RUN cd apps/telegram-miniapp && pnpm run build

# Production stage - lightweight web server
FROM node:20-alpine

WORKDIR /app

# Install http-server for serving static files
RUN npm install -g http-server

# Copy built app from builder
COPY --from=builder /app/apps/telegram-miniapp/dist ./dist

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

CMD ["http-server", "dist", "-p", "5173", "--gzip"]
