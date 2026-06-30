import { FastifyInstance } from 'fastify';
import { ActivityService } from '../../../platform/activity/activity.service.js';

export async function registerActivityRoutes(
  _app: FastifyInstance,
  _activityService: ActivityService
): Promise<void> {
  void _app;
  void _activityService;
}
