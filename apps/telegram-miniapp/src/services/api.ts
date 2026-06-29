const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface AuthResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      telegramId: bigint;
      firstName?: string;
      lastName?: string;
      username?: string;
      profileImage?: string;
      createdAt: string;
    };
  };
  error?: string;
}

export async function authenticateWithTelegram(initData: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/telegram`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initData }),
  });

  const data: AuthResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Authentication failed');
  }

  if (!data.data?.user) {
    throw new Error('No user data returned');
  }

  return data.data.user;
}

/**
 * Retrieves current user profile from initData.
 * Auto-creates profile on first call.
 */
export async function getCurrentUser(initData: string) {
  const response = await fetch(`${API_BASE_URL}/api/me?initData=${encodeURIComponent(initData)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: AuthResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to get user');
  }

  if (!data.data?.user) {
    throw new Error('No user data returned');
  }

  return data.data.user;
}
