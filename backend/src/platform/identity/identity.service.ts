import { PrismaClient } from '@prisma/client';

export class IdentityService {
  constructor(_prisma: PrismaClient, _telegramBotToken: string) {}
}
