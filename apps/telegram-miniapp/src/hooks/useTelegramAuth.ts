import { useState, useCallback, useEffect } from 'react';
import { authenticateWithTelegram, getCurrentUser } from '../services/api';
import type { User } from '../types/user';

export function useTelegramAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Try to restore user from sessionStorage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('go_irl_user');
    const storedInitData = sessionStorage.getItem('go_irl_initData');

    if (storedUser && storedInitData) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch {
        sessionStorage.removeItem('go_irl_user');
        sessionStorage.removeItem('go_irl_initData');
      }
    }

    // If no stored session, try to get current user from initData
    const initData = window.Telegram?.WebApp?.initData;
    if (initData) {
      getCurrentUser(initData)
        .then((userData) => {
          setUser(userData);
          sessionStorage.setItem('go_irl_user', JSON.stringify(userData));
          sessionStorage.setItem('go_irl_initData', initData);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : 'Failed to restore session');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const initData = window.Telegram?.WebApp?.initData;
      if (!initData) {
        throw new Error('Telegram initData not available');
      }

      const userData = await authenticateWithTelegram(initData);
      setUser(userData);
      sessionStorage.setItem('go_irl_user', JSON.stringify(userData));
      sessionStorage.setItem('go_irl_initData', initData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, login };
}
