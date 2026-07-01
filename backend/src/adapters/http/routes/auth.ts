import { FastifyInstance } from 'fastify';
import { IdentityService } from '../../../platform/identity/identity.service.js';

interface AuthBody {
  initData: string;
}

function serializeUser(user: {
  id: string;
  telegramId: bigint;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  profileImage: string | null;
  createdAt: Date;
}): {
  id: string;
  telegramId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  profileImage: string | null;
  createdAt: string;
} {
  return {
    id: user.id,
    telegramId: user.telegramId.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    profileImage: user.profileImage,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function registerAuthRoutes(
  app: FastifyInstance,
  identityService: IdentityService
): Promise<void> {
  app.post<{ Body: AuthBody }>('/api/auth/telegram', async (request, reply) => {
    const { initData } = request.body;

    if (!initData) {
      return reply.status(400).send({ success: false, error: 'initData is required' });
    }

    try {
      const telegramUser = identityService.verifyInitData(initData);
      const user = await identityService.findOrCreateUser(telegramUser);
      return reply.send({ success: true, data: { user: serializeUser(user) } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      return reply.status(401).send({ success: false, error: message });
    }
  });

  app.get<{ Querystring: { initData?: string } }>('/api/me', async (request, reply) => {
    const { initData } = request.query;

    if (!initData) {
      return reply.status(400).send({ success: false, error: 'initData query param is required' });
    }

    try {
      const telegramUser = identityService.verifyInitData(initData);
      const user = await identityService.findOrCreateUser(telegramUser);
      return reply.send({ success: true, data: { user: serializeUser(user) } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      return reply.status(401).send({ success: false, error: message });
    }
  });
}
