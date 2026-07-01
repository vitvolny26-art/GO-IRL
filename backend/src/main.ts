import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { PrismaClient } from '@prisma/client';
import { IdentityService } from './platform/identity/identity.service.js';
import { ActivityService } from './platform/activity/activity.service.js';
import { registerAuthRoutes } from './adapters/http/routes/auth.js';
import { registerActivityRoutes } from './adapters/http/routes/activities.js';

const app = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
if (!telegramBotToken) {
  console.error('TELEGRAM_BOT_TOKEN environment variable is not set');
  process.exit(1);
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('JWT_SECRET environment variable is not set');
  process.exit(1);
}

const identityService = new IdentityService(prisma, telegramBotToken, jwtSecret);
const activityService = new ActivityService(prisma);

await app.register(cors);
await app.register(rateLimit, {
  global: true,
  max: 100,
  timeWindow: '1 minute',
});

app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

app.get('/', async () => {
  return {
    name: 'GO IRL',
    mission: 'Go outside. Meet people. Live more.',
    version: '0.0.1',
  };
});

await registerAuthRoutes(app, identityService);

await registerActivityRoutes(app, activityService, identityService);

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  await app.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  await app.close();
  process.exit(0);
});

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
