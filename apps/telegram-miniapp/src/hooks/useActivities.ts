import { useState, useEffect } from 'react';
import { getActivities } from '../services/api';
import type { Activity } from '../types/index';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await getActivities();
        setActivities(data);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load activities';
        setError(message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
}
