import { PrismaClient } from '@prisma/client';

export class IdentityService {
  constructor(prisma: PrismaClient, telegramBotToken: string) {}
}
