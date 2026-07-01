import { describe, it, expect } from 'vitest';
import { createHmac } from 'crypto';
import { IdentityService } from './identity.service.js';

const BOT_TOKEN = 'test-bot-token';
const JWT_SECRET = 'test-jwt-secret';

function buildValidInitData(user: Record<string, unknown>): string {
  const params = new URLSearchParams();
  params.set('auth_date', String(Math.floor(Date.now() / 1000)));
  params.set('user', JSON.stringify(user));

  const entries = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  const secretKey = createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
  const hash = createHmac('sha256', secretKey).update(entries).digest('hex');

  params.set('hash', hash);
  return params.toString();
}

describe('IdentityService.verifyInitData', () => {
  const service = new IdentityService({} as never, BOT_TOKEN, JWT_SECRET);

  it('returns the user when initData is valid', () => {
    const user = { id: 12345, first_name: 'Alice', username: 'alice' };
    const initData = buildValidInitData(user);
    const result = service.verifyInitData(initData);
    expect(result.id).toBe(user.id);
    expect(result.first_name).toBe(user.first_name);
    expect(result.username).toBe(user.username);
  });

  it('throws when hash is missing', () => {
    expect(() => service.verifyInitData('auth_date=1234567890&user=%7B%7D')).toThrow(
      'Missing hash in initData'
    );
  });

  it('throws when hash is invalid', () => {
    const params = new URLSearchParams();
    params.set('auth_date', '1234567890');
    params.set('user', JSON.stringify({ id: 1 }));
    params.set('hash', 'badhash');
    expect(() => service.verifyInitData(params.toString())).toThrow('Invalid initData signature');
  });

  it('throws when user field is missing', () => {
    const params = new URLSearchParams();
    params.set('auth_date', String(Math.floor(Date.now() / 1000)));

    const entries = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
    const hash = createHmac('sha256', secretKey).update(entries).digest('hex');
    params.set('hash', hash);

    expect(() => service.verifyInitData(params.toString())).toThrow('Missing user in initData');
  });
});

describe('IdentityService JWT', () => {
  const service = new IdentityService({} as never, BOT_TOKEN, JWT_SECRET);

  it('issues a token and verifies it', () => {
    const token = service.issueToken('user-1', '99999');
    const payload = service.verifyToken(token);
    expect(payload.sub).toBe('user-1');
    expect(payload.telegramId).toBe('99999');
  });

  it('throws on tampered token', () => {
    const token = service.issueToken('user-2', '88888');
    const tampered = token.slice(0, -5) + 'XXXXX';
    expect(() => service.verifyToken(tampered)).toThrow();
  });
});
