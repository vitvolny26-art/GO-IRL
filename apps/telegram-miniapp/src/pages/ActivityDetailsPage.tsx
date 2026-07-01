import { useState } from 'react';
import type { Activity } from '../types/index';
import '../styles/ActivityDetailsPage.css';

interface ActivityDetailsPageProps {
  activity: Activity;
  currentUserId?: string;
  initData: string;
  onJoin: () => Promise<void>;
  onLeave: () => Promise<void>;
  onBack: () => void;
}

export function ActivityDetailsPage({
  activity: initialActivity,
  currentUserId,
  onJoin,
  onLeave,
  onBack,
}: ActivityDetailsPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [optimisticCount, setOptimisticCount] = useState<number | null>(null);
  const [optimisticJoined, setOptimisticJoined] = useState<boolean | null>(null);

  const participantCount = optimisticCount ?? initialActivity.participantCount;
  const isJoined =
    optimisticJoined ??
    (currentUserId
      ? (initialActivity.participants ?? []).some((p) => p.id === currentUserId)
      : false);

  const organizerName =
    [initialActivity.organizer?.firstName, initialActivity.organizer?.lastName]
      .filter(Boolean)
      .join(' ') || 'Unknown';

  const startDate = new Date(initialActivity.startTime);
  const formattedDate = startDate.toLocaleDateString('ru-RU', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const spotsRemaining = initialActivity.maxParticipants - participantCount;

  const handleJoin = async () => {
    setIsLoading(true);
    setActionError(null);
    // Optimistic update
    setOptimisticCount(participantCount + 1);
    setOptimisticJoined(true);
    try {
      await onJoin();
    } catch (err) {
      // Revert
      setOptimisticCount(null);
      setOptimisticJoined(null);
      setActionError(err instanceof Error ? err.message : 'Failed to join');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeave = async () => {
    setIsLoading(true);
    setActionError(null);
    // Optimistic update
    setOptimisticCount(Math.max(0, participantCount - 1));
    setOptimisticJoined(false);
    try {
      await onLeave();
    } catch (err) {
      // Revert
      setOptimisticCount(null);
      setOptimisticJoined(null);
      setActionError(err instanceof Error ? err.message : 'Failed to leave');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="activity-details-container">
      <button className="details-back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="activity-details-header">
        <h1 className="activity-title">{initialActivity.title}</h1>
        <p className="activity-type">{initialActivity.type}</p>
      </div>

      <div className="activity-details-content">
        {initialActivity.description && (
          <div className="activity-section">
            <h3>About</h3>
            <p className="activity-description">{initialActivity.description}</p>
          </div>
        )}

        <div className="activity-section">
          <h3>📅 When</h3>
          <div className="activity-when">
            <p className="activity-date">
              {formattedDate} at {formattedTime}
            </p>
          </div>
        </div>

        <div className="activity-section">
          <h3>📍 Where</h3>
          <p className="activity-location">
            {initialActivity.location.latitude.toFixed(4)},{' '}
            {initialActivity.location.longitude.toFixed(4)}
          </p>
        </div>

        <div className="activity-section">
          <h3>👤 Organizer</h3>
          <div className="organizer-card">
            {initialActivity.organizer?.profileImage && (
              <img
                src={initialActivity.organizer.profileImage}
                alt={organizerName}
                className="organizer-avatar"
              />
            )}
            <div className="organizer-info">
              <p className="organizer-name">{organizerName}</p>
              {initialActivity.organizer?.username && (
                <p className="organizer-username">@{initialActivity.organizer.username}</p>
              )}
            </div>
          </div>
        </div>

        <div className="activity-section">
          <h3>👥 Participants</h3>
          <div className="participants-status">
            <p className="participants-count">
              {participantCount}/{initialActivity.maxParticipants}
            </p>
            {spotsRemaining > 0 ? (
              <p className="spots-remaining">
                {spotsRemaining} spot{spotsRemaining !== 1 ? 's' : ''} left
              </p>
            ) : (
              <p className="spots-full">Activity is full</p>
            )}
          </div>

          {initialActivity.participants && initialActivity.participants.length > 0 && (
            <div className="participants-list">
              {initialActivity.participants.map((participant) => {
                const participantName =
                  [participant.firstName, participant.lastName].filter(Boolean).join(' ') ||
                  'Anonymous';
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

      {actionError && <div className="action-error">{actionError}</div>}

      <div className="activity-details-footer">
        {isJoined ? (
          <button className="leave-button" onClick={handleLeave} disabled={isLoading}>
            {isLoading ? 'Leaving…' : '✓ Joined — Leave'}
          </button>
        ) : (
          <button
            className="join-button"
            onClick={handleJoin}
            disabled={isLoading || spotsRemaining <= 0}
          >
            {isLoading ? 'Joining…' : spotsRemaining <= 0 ? 'Activity Full' : 'JOIN ACTIVITY'}
          </button>
        )}
      </div>
    </div>
  );
}
