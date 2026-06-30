import { FastifyInstance } from 'fastify';
import { ActivityService } from '../../platform/activity/activity.service.js';

export async function registerActivityRoutes(
  app: FastifyInstance,
  activityService: ActivityService
): Promise<void> {}
