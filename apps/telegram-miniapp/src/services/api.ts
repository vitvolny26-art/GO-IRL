const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const TOKEN_KEY = 'go_irl_token';
const USER_KEY = 'go_irl_user';
const INIT_DATA_KEY = 'go_irl_initData';

export function getStoredToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearSession(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(INIT_DATA_KEY);
}

function authHeaders(): HeadersInit {
  const token = getStoredToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: 'Bearer ' + token } : {}),
  };
}

interface AuthResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      telegramId: string;
      firstName?: string;
      lastName?: string;
      username?: string;
      profileImage?: string;
      createdAt: string;
    };
    token: string;
  };
  error?: string;
}

export async function authenticateWithTelegram(initData: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/telegram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  });

  const data: AuthResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Authentication failed');
  }

  if (!data.data?.user) {
    throw new Error('No user data returned');
  }

  if (data.data.token) {
    setStoredToken(data.data.token);
  }

  return data.data.user;
}

export async function getCurrentUser(initData: string) {
  const response = await fetch(`${API_BASE_URL}/api/me?initData=${encodeURIComponent(initData)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data: AuthResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to get user');
  }

  if (!data.data?.user) {
    throw new Error('No user data returned');
  }

  if (data.data.token) {
    setStoredToken(data.data.token);
  }

  return data.data.user;
}

// Activity API endpoints

interface ActivitiesResponse {
  success: boolean;
  data?: {
    activities: Array<{
      id: string;
      title: string;
      description?: string;
      type: string;
      location: { latitude: number; longitude: number };
      startTime: string;
      endTime?: string;
      maxParticipants: number;
      participantCount: number;
      status: string;
      createdAt: string;
    }>;
  };
  error?: string;
}

export async function getActivities() {
  const response = await fetch(`${API_BASE_URL}/api/activities`, {
    method: 'GET',
    headers: authHeaders(),
  });

  const data: ActivitiesResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch activities');
  }

  return data.data?.activities || [];
}

interface ActivityDetailsResponse {
  success: boolean;
  data?: {
    activity: {
      id: string;
      title: string;
      description?: string;
      type: string;
      location: { latitude: number; longitude: number };
      startTime: string;
      endTime?: string;
      maxParticipants: number;
      participantCount: number;
      participants: Array<{
        id: string;
        firstName?: string;
        lastName?: string;
        username?: string;
        profileImage?: string;
      }>;
      organizer: {
        id: string;
        firstName?: string;
        lastName?: string;
        username?: string;
        profileImage?: string;
      };
      status: string;
      createdAt: string;
    };
  };
  error?: string;
}

export async function getActivityById(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/activities/${id}`, {
    method: 'GET',
    headers: authHeaders(),
  });

  const data: ActivityDetailsResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch activity');
  }

  if (!data.data?.activity) {
    throw new Error('Activity not found');
  }

  return data.data.activity;
}

interface ActivityMutationResponse {
  success: boolean;
  data?: {
    activity: {
      id: string;
      title: string;
      participantCount: number;
      maxParticipants: number;
    };
  };
  error?: string;
  code?: string;
}

export async function joinActivity(activityId: string, initData: string) {
  const response = await fetch(`${API_BASE_URL}/api/activities/${activityId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  });

  const data: ActivityMutationResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to join activity');
  }

  return data.data?.activity;
}

export async function leaveActivity(activityId: string, initData: string) {
  const response = await fetch(`${API_BASE_URL}/api/activities/${activityId}/leave`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  });

  const data: ActivityMutationResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to leave activity');
  }

  return data.data?.activity;
}

export interface CreateActivityPayload {
  title: string;
  description?: string;
  type: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime?: string;
  maxParticipants: number;
  initData: string;
}

interface CreateActivityResponse {
  success: boolean;
  data?: {
    activity: {
      id: string;
      title: string;
      type: string;
      location: { latitude: number; longitude: number };
      startTime: string;
      maxParticipants: number;
      participantCount: number;
      status: string;
      createdAt: string;
    };
  };
  error?: string;
}

export async function createActivity(payload: CreateActivityPayload) {
  const response = await fetch(`${API_BASE_URL}/api/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data: CreateActivityResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to create activity');
  }

  if (!data.data?.activity) {
    throw new Error('No activity returned');
  }

  return data.data.activity;
}
