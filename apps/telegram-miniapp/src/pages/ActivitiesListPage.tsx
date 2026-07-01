import { useActivities } from '../hooks/useActivities';
import type { Activity } from '../types/index';
import '../styles/ActivitiesListPage.css';

const ACTIVITY_TYPE_EMOJI: Record<string, string> = {
  sport: '🏃',
  nature: '🌿',
  learning: '📚',
  creative: '🎨',
  food: '🍕',
  social: '👋',
};

interface ActivityCardProps {
  activity: Activity;
  onClick: (id: string) => void;
}

function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const emoji = ACTIVITY_TYPE_EMOJI[activity.type.toLowerCase()] ?? '🎯';
  const startDate = new Date(activity.startTime);
  const dateStr = startDate.toLocaleDateString('ru-RU', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeStr = startDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const spotsLeft = activity.maxParticipants - activity.participantCount;
  const isFull = spotsLeft <= 0;

  return (
    <button className="activity-card" onClick={() => onClick(activity.id)}>
      <div className="activity-card-header">
        <span className="activity-card-emoji">{emoji}</span>
        <span className={`activity-card-spots ${isFull ? 'full' : ''}`}>
          {isFull ? 'Full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
        </span>
      </div>
      <h3 className="activity-card-title">{activity.title}</h3>
      {activity.description && <p className="activity-card-description">{activity.description}</p>}
      <div className="activity-card-meta">
        <span className="activity-card-date">
          📅 {dateStr} at {timeStr}
        </span>
        <span className="activity-card-participants">
          👥 {activity.participantCount}/{activity.maxParticipants}
        </span>
      </div>
      <div className="activity-card-type">
        <span className="activity-type-badge">{activity.type}</span>
      </div>
    </button>
  );
}

interface ActivitiesListPageProps {
  onSelectActivity: (id: string) => void;
  onCreateActivity: () => void;
  onProfile: () => void;
}

export function ActivitiesListPage({
  onSelectActivity,
  onCreateActivity,
  onProfile,
}: ActivitiesListPageProps) {
  const { activities, loading, error } = useActivities();

  return (
    <div className="activities-list-container">
      <header className="activities-list-header">
        <div className="header-brand">
          <span className="brand-go">GO</span> IRL
        </div>
        <div className="header-actions">
          <button className="header-btn" onClick={onCreateActivity} title="Create activity">
            ➕
          </button>
          <button className="header-btn" onClick={onProfile} title="Profile">
            👤
          </button>
        </div>
      </header>

      <main className="activities-list-content">
        {loading && (
          <div className="list-state">
            <p>Loading activities…</p>
          </div>
        )}

        {error && (
          <div className="list-state error">
            <p>⚠️ {error}</p>
            <p className="list-state-hint">Pull down to retry</p>
          </div>
        )}

        {!loading && !error && activities.length === 0 && (
          <div className="list-state empty">
            <p className="empty-icon">🌍</p>
            <p className="empty-title">No activities yet</p>
            <p className="empty-hint">Be the first to create one!</p>
            <button className="create-first-btn" onClick={onCreateActivity}>
              Create Activity
            </button>
          </div>
        )}

        {!loading && activities.length > 0 && (
          <div className="activities-grid">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onClick={onSelectActivity} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
