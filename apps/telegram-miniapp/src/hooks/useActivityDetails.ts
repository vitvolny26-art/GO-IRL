import { useState, useEffect } from 'react';
import { getActivityById } from '../services/api';
import type { Activity } from '../types/index';

export function useActivityDetails(activityId: string) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const data = await getActivityById(activityId);
      setActivity(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load activity';
      setError(message);
      setActivity(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [activityId]); // eslint-disable-line -- fetchActivity is stable within this effect scope

  return { activity, loading, error, refetch: fetchActivity };
}
