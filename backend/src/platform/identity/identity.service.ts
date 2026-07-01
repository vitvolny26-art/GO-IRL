import { createHmac } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface JwtPayload {
  sub: string;
  telegramId: string;
  iat?: number;
  exp?: number;
}

export class IdentityService {
  private readonly prisma: PrismaClient;
  private readonly telegramBotToken: string;
  private readonly jwtSecret: string;

  constructor(prisma: PrismaClient, telegramBotToken: string, jwtSecret: string) {
    this.prisma = prisma;
    this.telegramBotToken = telegramBotToken;
    this.jwtSecret = jwtSecret;
  }

  verifyInitData(initData: string): TelegramUser {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) {
      throw new Error('Missing hash in initData');
    }

    params.delete('hash');
    const entries = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData').update(this.telegramBotToken).digest();

    const expectedHash = createHmac('sha256', secretKey).update(entries).digest('hex');

    if (expectedHash !== hash) {
      throw new Error('Invalid initData signature');
    }

    const userParam = params.get('user');
    if (!userParam) {
      throw new Error('Missing user in initData');
    }

    return JSON.parse(userParam) as TelegramUser;
  }

  issueToken(userId: string, telegramId: string): string {
    return sign({ sub: userId, telegramId } as JwtPayload, this.jwtSecret, { expiresIn: '7d' });
  }

  verifyToken(token: string): JwtPayload {
    return verify(token, this.jwtSecret) as JwtPayload;
  }

  async findOrCreateUser(telegramUser: TelegramUser): Promise<{
    id: string;
    telegramId: bigint;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    profileImage: string | null;
    createdAt: Date;
  }> {
    return this.prisma.user.upsert({
      where: { telegramId: BigInt(telegramUser.id) },
      update: {
        firstName: telegramUser.first_name ?? null,
        lastName: telegramUser.last_name ?? null,
        username: telegramUser.username ?? null,
        profileImage: telegramUser.photo_url ?? null,
      },
      create: {
        telegramId: BigInt(telegramUser.id),
        firstName: telegramUser.first_name ?? null,
        lastName: telegramUser.last_name ?? null,
        username: telegramUser.username ?? null,
        profileImage: telegramUser.photo_url ?? null,
      },
    });
  }
}
