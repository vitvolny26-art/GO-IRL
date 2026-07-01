import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ActivityService } from './activity.service.js';

function makeActivity(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'act-1',
    title: 'Morning Run',
    description: null,
    type: 'sport',
    latitude: 55.75,
    longitude: 37.62,
    startTime: new Date('2026-08-01T08:00:00Z'),
    endTime: null,
    maxParticipants: 10,
    status: 'published',
    createdAt: new Date('2026-07-01T00:00:00Z'),
    updatedAt: new Date('2026-07-01T00:00:00Z'),
    createdById: 'user-1',
    ...overrides,
  };
}

function makePrisma(): {
  activity: {
    findMany: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    findUniqueOrThrow: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
  };
  activityParticipant: {
    create: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
  };
} {
  return {
    activity: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      create: vi.fn(),
    },
    activityParticipant: {
      create: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
    },
  };
}

describe('ActivityService.listActivities', () => {
  it('returns mapped activity summaries', async () => {
    const prisma = makePrisma();
    const act = { ...makeActivity(), _count: { participants: 3 } };
    prisma.activity.findMany.mockResolvedValue([act]);

    const service = new ActivityService(prisma as never);
    const result = await service.listActivities();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('act-1');
    expect(result[0].participantCount).toBe(3);
    expect(result[0].location).toEqual({ latitude: 55.75, longitude: 37.62 });
  });
});

describe('ActivityService.getActivityById', () => {
  it('returns null when activity does not exist', async () => {
    const prisma = makePrisma();
    prisma.activity.findUnique.mockResolvedValue(null);

    const service = new ActivityService(prisma as never);
    const result = await service.getActivityById('nonexistent');
    expect(result).toBeNull();
  });

  it('returns activity details when found', async () => {
    const prisma = makePrisma();
    const organizer = {
      id: 'user-1',
      telegramId: BigInt(111),
      firstName: 'Bob',
      lastName: null,
      username: 'bob',
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const act = {
      ...makeActivity(),
      createdBy: organizer,
      participants: [{ user: organizer }],
    };
    prisma.activity.findUnique.mockResolvedValue(act);

    const service = new ActivityService(prisma as never);
    const result = await service.getActivityById('act-1');

    expect(result).not.toBeNull();
    expect(result!.organizer.id).toBe('user-1');
    expect(result!.participants).toHaveLength(1);
  });
});

describe('ActivityService.createActivity', () => {
  it('creates and returns a new activity', async () => {
    const prisma = makePrisma();
    const created = { ...makeActivity(), _count: { participants: 0 } };
    prisma.activity.create.mockResolvedValue(created);

    const service = new ActivityService(prisma as never);
    const result = await service.createActivity(
      {
        title: 'Morning Run',
        type: 'sport',
        latitude: 55.75,
        longitude: 37.62,
        startTime: '2026-08-01T08:00:00Z',
        maxParticipants: 10,
      },
      'user-1'
    );

    expect(result.title).toBe('Morning Run');
    expect(result.participantCount).toBe(0);
  });
});

describe('ActivityService.joinActivity', () => {
  let prisma: ReturnType<typeof makePrisma>;
  let service: ActivityService;

  beforeEach(() => {
    prisma = makePrisma();
    service = new ActivityService(prisma as never);
  });

  it('throws when activity not found', async () => {
    prisma.activity.findUnique.mockResolvedValue(null);
    await expect(service.joinActivity('no-act', 'user-1')).rejects.toThrow('Activity not found');
  });

  it('throws when activity is full', async () => {
    prisma.activity.findUnique.mockResolvedValue({
      ...makeActivity({ maxParticipants: 2 }),
      _count: { participants: 2 },
    });
    prisma.activityParticipant.findUnique.mockResolvedValue(null);
    await expect(service.joinActivity('act-1', 'user-1')).rejects.toThrow('Activity is full');
  });

  it('throws when already joined', async () => {
    prisma.activity.findUnique.mockResolvedValue({
      ...makeActivity(),
      _count: { participants: 1 },
    });
    prisma.activityParticipant.findUnique.mockResolvedValue({
      activityId: 'act-1',
      userId: 'user-1',
      joinedAt: new Date(),
    });
    await expect(service.joinActivity('act-1', 'user-1')).rejects.toThrow('Already joined');
  });

  it('joins and returns updated activity', async () => {
    prisma.activity.findUnique.mockResolvedValue({
      ...makeActivity(),
      _count: { participants: 1 },
    });
    prisma.activityParticipant.findUnique.mockResolvedValue(null);
    prisma.activityParticipant.create.mockResolvedValue({});
    prisma.activity.findUniqueOrThrow.mockResolvedValue({
      ...makeActivity(),
      _count: { participants: 2 },
    });

    const result = await service.joinActivity('act-1', 'user-2');
    expect(result.participantCount).toBe(2);
  });
});

describe('ActivityService.leaveActivity', () => {
  let prisma: ReturnType<typeof makePrisma>;
  let service: ActivityService;

  beforeEach(() => {
    prisma = makePrisma();
    service = new ActivityService(prisma as never);
  });

  it('throws when activity not found', async () => {
    prisma.activity.findUnique.mockResolvedValue(null);
    await expect(service.leaveActivity('no-act', 'user-1')).rejects.toThrow('Activity not found');
  });

  it('throws when not a participant', async () => {
    prisma.activity.findUnique.mockResolvedValue({
      ...makeActivity(),
      _count: { participants: 1 },
    });
    prisma.activityParticipant.findUnique.mockResolvedValue(null);
    await expect(service.leaveActivity('act-1', 'user-1')).rejects.toThrow('Not a participant');
  });

  it('leaves and returns updated activity', async () => {
    prisma.activity.findUnique.mockResolvedValue({
      ...makeActivity(),
      _count: { participants: 2 },
    });
    prisma.activityParticipant.findUnique.mockResolvedValue({
      activityId: 'act-1',
      userId: 'user-1',
      joinedAt: new Date(),
    });
    prisma.activityParticipant.delete.mockResolvedValue({});
    prisma.activity.findUniqueOrThrow.mockResolvedValue({
      ...makeActivity(),
      _count: { participants: 1 },
    });

    const result = await service.leaveActivity('act-1', 'user-1');
    expect(result.participantCount).toBe(1);
  });
});
