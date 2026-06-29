import type { Activity } from '../types/index';
import '../styles/ActivityDetailsPage.css';

interface ActivityDetailsPageProps {
  activity: Activity;
  onJoin: () => void;
  isLoading?: boolean;
}

export function ActivityDetailsPage({ activity, onJoin, isLoading }: ActivityDetailsPageProps) {
  const organizerName = [activity.organizer?.firstName, activity.organizer?.lastName]
    .filter(Boolean)
    .join(' ') || 'Unknown';

  const startDate = new Date(activity.startTime);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const participantSlots = `${activity.participantCount}/${activity.maxParticipants}`;
  const spotsRemaining = activity.maxParticipants - activity.participantCount;

  return (
    <div className="activity-details-container">
      <div className="activity-details-header">
        <h1 className="activity-title">{activity.title}</h1>
        <p className="activity-type">{activity.type}</p>
      </div>

      <div className="activity-details-content">
        {activity.description && (
          <div className="activity-section">
            <h3>About</h3>
            <p className="activity-description">{activity.description}</p>
          </div>
        )}

        <div className="activity-section">
          <h3>📅 When</h3>
          <div className="activity-when">
            <p className="activity-date">{formattedDate} at {formattedTime}</p>
          </div>
        </div>

        <div className="activity-section">
          <h3>📍 Where</h3>
          <p className="activity-location">
            Lat: {activity.location.latitude.toFixed(4)}, Lon: {activity.location.longitude.toFixed(4)}
          </p>
          <p className="location-hint">Map coming in Sprint 2</p>
        </div>

        <div className="activity-section">
          <h3>👤 Organizer</h3>
          <div className="organizer-card">
            {activity.organizer?.profileImage && (
              <img src={activity.organizer.profileImage} alt={organizerName} className="organizer-avatar" />
            )}
            <div className="organizer-info">
              <p className="organizer-name">{organizerName}</p>
              {activity.organizer?.username && (
                <p className="organizer-username">@{activity.organizer.username}</p>
              )}
            </div>
          </div>
        </div>

        <div className="activity-section">
          <h3>👥 Participants</h3>
          <div className="participants-status">
            <p className="participants-count">{participantSlots}</p>
            {spotsRemaining > 0 ? (
              <p className="spots-remaining">{spotsRemaining} spot{spotsRemaining !== 1 ? 's' : ''} left</p>
            ) : (
              <p className="spots-full">Activity is full</p>
            )}
          </div>

          {activity.participants && activity.participants.length > 0 && (
            <div className="participants-list">
              {activity.participants.map((participant) => {
                const participantName = [participant.firstName, participant.lastName]
                  .filter(Boolean)
                  .join(' ') || 'Anonymous';
                return (
                  <div key={participant.id} className="participant-item">
                    {participant.profileImage && (
                      <img
                        src={participant.profileImage}
                        alt={participantName}
                        className="participant-avatar"
                      />
                    )}
                    <span className="participant-name">{participantName}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="activity-details-footer">
        <button className="join-button" onClick={onJoin} disabled={isLoading || spotsRemaining <= 0}>
          {isLoading ? 'Joining...' : spotsRemaining <= 0 ? 'Activity Full' : 'JOIN ACTIVITY'}
        </button>
      </div>
    </div>
  );
}
