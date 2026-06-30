import { FastifyInstance } from 'fastify';
import { IdentityService } from '../../platform/identity/identity.service.js';

export async function registerAuthRoutes(
  _app: FastifyInstance,
  _identityService: IdentityService
): Promise<void> {}
