import { FastifyInstance } from 'fastify';
import { ActivityService, CreateActivityInput } from '../../../platform/activity/activity.service.js';
import { IdentityService } from '../../../platform/identity/identity.service.js';

export async function registerActivityRoutes(
  app: FastifyInstance,
  activityService: ActivityService,
  identityService?: IdentityService
): Promise<void> {
  app.get('/api/activities', async (_request, reply) => {
    try {
      const activities = await activityService.listActivities();
      return reply.send({ success: true, data: { activities } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch activities';
      return reply.status(500).send({ success: false, error: message });
    }
  });

  app.get<{ Params: { id: string } }>('/api/activities/:id', async (request, reply) => {
    try {
      const activity = await activityService.getActivityById(request.params.id);
      if (!activity) {
        return reply.status(404).send({ success: false, error: 'Activity not found' });
      }
      return reply.send({ success: true, data: { activity } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch activity';
      return reply.status(500).send({ success: false, error: message });
    }
  });

  app.post<{ Body: CreateActivityInput & { initData: string } }>(
    '/api/activities',
    async (request, reply) => {
      const { initData, ...input } = request.body;

      if (!initData || !identityService) {
        return reply.status(400).send({ success: false, error: 'initData is required' });
      }

      try {
        const telegramUser = identityService.verifyInitData(initData);
        const user = await identityService.findOrCreateUser(telegramUser);
        const activity = await activityService.createActivity(input, user.id);
        return reply.status(201).send({ success: true, data: { activity } });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create activity';
        const status = message === 'Invalid initData signature' ? 401 : 500;
        return reply.status(status).send({ success: false, error: message });
      }
    }
  );

  app.post<{ Params: { id: string }; Body: { initData: string } }>(
    '/api/activities/:id/join',
    async (request, reply) => {
      const { initData } = request.body;

      if (!initData || !identityService) {
        return reply.status(400).send({ success: false, error: 'initData is required' });
      }

      try {
        const telegramUser = identityService.verifyInitData(initData);
        const user = await identityService.findOrCreateUser(telegramUser);
        const activity = await activityService.joinActivity(request.params.id, user.id);
        return reply.send({ success: true, data: { activity } });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to join activity';
        const status =
          message === 'Activity not found'
            ? 404
            : message === 'Activity is full'
              ? 409
              : message === 'Invalid initData signature'
                ? 401
                : 500;
        return reply.status(status).send({ success: false, error: message });
      }
    }
  );
}
