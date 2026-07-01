import { PrismaClient } from '@prisma/client';

interface ActivityBase {
  id: string;
  title: string;
  description: string | null;
  type: string;
  latitude: number;
  longitude: number;
  startTime: Date;
  endTime: Date | null;
  maxParticipants: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
}

interface UserBase {
  id: string;
  telegramId: bigint;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ActivityWithCount extends ActivityBase {
  _count: { participants: number };
}

interface ActivityWithDetails extends ActivityBase {
  createdBy: UserBase;
  participants: Array<{ user: UserBase }>;
}

export interface ActivitySummary {
  id: string;
  title: string;
  description: string | null;
  type: string;
  location: { latitude: number; longitude: number };
  startTime: string;
  endTime: string | null;
  maxParticipants: number;
  participantCount: number;
  status: string;
  createdAt: string;
}

export interface ParticipantInfo {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  profileImage: string | null;
}

export interface ActivityDetails extends ActivitySummary {
  participants: ParticipantInfo[];
  organizer: ParticipantInfo;
}

export interface CreateActivityInput {
  title: string;
  description?: string;
  type: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime?: string;
  maxParticipants: number;
}

export class ActivityService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listActivities(): Promise<ActivitySummary[]> {
    const activities = await this.prisma.activity.findMany({
      orderBy: { startTime: 'asc' },
      include: { _count: { select: { participants: true } } },
    });

    return (activities as ActivityWithCount[]).map((a) => this.toSummary(a, a._count.participants));
  }

  async getActivityById(id: string): Promise<ActivityDetails | null> {
    const a = (await this.prisma.activity.findUnique({
      where: { id },
      include: {
        createdBy: true,
        participants: { include: { user: true } },
      },
    })) as ActivityWithDetails | null;

    if (!a) return null;

    return {
      ...this.toSummary(a, a.participants.length),
      organizer: this.toParticipantInfo(a.createdBy),
      participants: a.participants.map((p) => this.toParticipantInfo(p.user)),
    };
  }

  async createActivity(input: CreateActivityInput, createdById: string): Promise<ActivitySummary> {
    const a = (await this.prisma.activity.create({
      data: {
        title: input.title,
        description: input.description ?? null,
        type: input.type,
        latitude: input.latitude,
        longitude: input.longitude,
        startTime: new Date(input.startTime),
        endTime: input.endTime ? new Date(input.endTime) : null,
        maxParticipants: input.maxParticipants,
        createdById,
      },
      include: { _count: { select: { participants: true } } },
    })) as ActivityWithCount;

    return this.toSummary(a, a._count.participants);
  }

  async joinActivity(activityId: string, userId: string): Promise<ActivitySummary> {
    const activity = (await this.prisma.activity.findUnique({
      where: { id: activityId },
      include: { _count: { select: { participants: true } } },
    })) as ActivityWithCount | null;

    if (!activity) throw new Error('Activity not found');
    if (activity._count.participants >= activity.maxParticipants) {
      throw new Error('Activity is full');
    }

    const existing = await this.prisma.activityParticipant.findUnique({
      where: { activityId_userId: { activityId, userId } },
    });
    if (existing) throw new Error('Already joined');

    await this.prisma.activityParticipant.create({
      data: { activityId, userId },
    });

    const updated = (await this.prisma.activity.findUniqueOrThrow({
      where: { id: activityId },
      include: { _count: { select: { participants: true } } },
    })) as ActivityWithCount;

    return this.toSummary(updated, updated._count.participants);
  }

  async leaveActivity(activityId: string, userId: string): Promise<ActivitySummary> {
    const activity = (await this.prisma.activity.findUnique({
      where: { id: activityId },
      include: { _count: { select: { participants: true } } },
    })) as ActivityWithCount | null;

    if (!activity) throw new Error('Activity not found');

    const existing = await this.prisma.activityParticipant.findUnique({
      where: { activityId_userId: { activityId, userId } },
    });
    if (!existing) throw new Error('Not a participant');

    await this.prisma.activityParticipant.delete({
      where: { activityId_userId: { activityId, userId } },
    });

    const updated = (await this.prisma.activity.findUniqueOrThrow({
      where: { id: activityId },
      include: { _count: { select: { participants: true } } },
    })) as ActivityWithCount;

    return this.toSummary(updated, updated._count.participants);
  }

  private toSummary(a: ActivityBase, participantCount: number): ActivitySummary {
    return {
      id: a.id,
      title: a.title,
      description: a.description,
      type: a.type,
      location: { latitude: a.latitude, longitude: a.longitude },
      startTime: a.startTime.toISOString(),
      endTime: a.endTime ? a.endTime.toISOString() : null,
      maxParticipants: a.maxParticipants,
      participantCount,
      status: a.status,
      createdAt: a.createdAt.toISOString(),
    };
  }

  private toParticipantInfo(u: UserBase): ParticipantInfo {
    return {
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      username: u.username,
      profileImage: u.profileImage,
    };
  }
}
