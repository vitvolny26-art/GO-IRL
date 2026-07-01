import { FastifyInstance } from 'fastify';
import {
  ActivityService,
  CreateActivityInput,
} from '../../../platform/activity/activity.service.js';
import { IdentityService } from '../../../platform/identity/identity.service.js';

function errorResponse(
  message: string,
  code: string
): { success: false; error: string; code: string } {
  return { success: false as const, error: message, code };
}

export async function registerActivityRoutes(
  app: FastifyInstance,
  activityService: ActivityService,
  identityService: IdentityService
): Promise<void> {
  app.get('/api/activities', async (_request, reply) => {
    try {
      const activities = await activityService.listActivities();
      return reply.send({ success: true, data: { activities } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch activities';
      return reply.status(500).send(errorResponse(message, 'INTERNAL_ERROR'));
    }
  });

  app.get<{ Params: { id: string } }>('/api/activities/:id', async (request, reply) => {
    try {
      const activity = await activityService.getActivityById(request.params.id);
      if (!activity) {
        return reply.status(404).send(errorResponse('Activity not found', 'NOT_FOUND'));
      }
      return reply.send({ success: true, data: { activity } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch activity';
      return reply.status(500).send(errorResponse(message, 'INTERNAL_ERROR'));
    }
  });

  app.post<{ Body: CreateActivityInput & { initData: string } }>(
    '/api/activities',
    async (request, reply) => {
      const { initData, ...input } = request.body;

      if (!initData) {
        return reply.status(400).send(errorResponse('initData is required', 'MISSING_INIT_DATA'));
      }

      if (!input.title || typeof input.title !== 'string' || input.title.trim().length === 0) {
        return reply.status(400).send(errorResponse('title is required', 'VALIDATION_ERROR'));
      }
      if (!input.type || typeof input.type !== 'string') {
        return reply.status(400).send(errorResponse('type is required', 'VALIDATION_ERROR'));
      }
      if (typeof input.latitude !== 'number' || typeof input.longitude !== 'number') {
        return reply
          .status(400)
          .send(errorResponse('latitude and longitude must be numbers', 'VALIDATION_ERROR'));
      }
      if (!input.startTime) {
        return reply.status(400).send(errorResponse('startTime is required', 'VALIDATION_ERROR'));
      }
      if (!input.maxParticipants || input.maxParticipants < 2) {
        return reply
          .status(400)
          .send(errorResponse('maxParticipants must be at least 2', 'VALIDATION_ERROR'));
      }

      try {
        const telegramUser = identityService.verifyInitData(initData);
        const user = await identityService.findOrCreateUser(telegramUser);
        const activity = await activityService.createActivity(input, user.id);
        return reply.status(201).send({ success: true, data: { activity } });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create activity';
        const status = message === 'Invalid initData signature' ? 401 : 500;
        const code = message === 'Invalid initData signature' ? 'UNAUTHORIZED' : 'INTERNAL_ERROR';
        return reply.status(status).send(errorResponse(message, code));
      }
    }
  );

  app.post<{ Params: { id: string }; Body: { initData: string } }>(
    '/api/activities/:id/join',
    async (request, reply) => {
      const { initData } = request.body;

      if (!initData) {
        return reply.status(400).send(errorResponse('initData is required', 'MISSING_INIT_DATA'));
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
            : message === 'Activity is full' || message === 'Already joined'
              ? 409
              : message === 'Invalid initData signature'
                ? 401
                : 500;
        const code =
          message === 'Activity not found'
            ? 'NOT_FOUND'
            : message === 'Activity is full'
              ? 'ACTIVITY_FULL'
              : message === 'Already joined'
                ? 'ALREADY_JOINED'
                : message === 'Invalid initData signature'
                  ? 'UNAUTHORIZED'
                  : 'INTERNAL_ERROR';
        return reply.status(status).send(errorResponse(message, code));
      }
    }
  );

  app.delete<{ Params: { id: string }; Body: { initData: string } }>(
    '/api/activities/:id/leave',
    async (request, reply) => {
      const { initData } = request.body;

      if (!initData) {
        return reply.status(400).send(errorResponse('initData is required', 'MISSING_INIT_DATA'));
      }

      try {
        const telegramUser = identityService.verifyInitData(initData);
        const user = await identityService.findOrCreateUser(telegramUser);
        const activity = await activityService.leaveActivity(request.params.id, user.id);
        return reply.send({ success: true, data: { activity } });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to leave activity';
        const status =
          message === 'Activity not found'
            ? 404
            : message === 'Not a participant'
              ? 409
              : message === 'Invalid initData signature'
                ? 401
                : 500;
        const code =
          message === 'Activity not found'
            ? 'NOT_FOUND'
            : message === 'Not a participant'
              ? 'NOT_PARTICIPANT'
              : message === 'Invalid initData signature'
                ? 'UNAUTHORIZED'
                : 'INTERNAL_ERROR';
        return reply.status(status).send(errorResponse(message, code));
      }
    }
  );
}
