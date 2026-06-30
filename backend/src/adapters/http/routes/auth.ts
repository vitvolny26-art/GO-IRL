import { FastifyInstance } from 'fastify';
import { IdentityService } from '../../platform/identity/identity.service.js';

export async function registerAuthRoutes(
  app: FastifyInstance,
  identityService: IdentityService
): Promise<void> {}
