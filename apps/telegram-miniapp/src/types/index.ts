export interface Activity {
  id: string;
  title: string;
  description?: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
  startTime: string;
  endTime?: string;
  maxParticipants: number;
  participantCount: number;
  participants?: Array<{
    id: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    profileImage?: string;
  }>;
  organizer?: {
    id: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    profileImage?: string;
  };
  status: string;
  createdAt: string;
}

export interface User {
  id: string;
  telegramId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  profileImage?: string;
  createdAt: string;
}
