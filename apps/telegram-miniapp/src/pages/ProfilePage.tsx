import type { User } from '../types/user';
import '../styles/ProfilePage.css';

interface ProfilePageProps {
  user: User;
  onBrowse: () => void;
  onLogout: () => void;
}

export function ProfilePage({ user, onBrowse, onLogout }: ProfilePageProps) {
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'User';
  const joinedDate = new Date(user.createdAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="profile-container">
      <header className="profile-nav">
        <button className="profile-back-btn" onClick={onBrowse}>
          ← Activities
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Exit
        </button>
      </header>

      <div className="profile-header">
        {user.profileImage && (
          <img src={user.profileImage} alt="Profile" className="profile-avatar" />
        )}
        <div className="profile-details">
          <h2 className="profile-name">{displayName}</h2>
          {user.username && <p className="profile-username">@{user.username}</p>}
          <p className="profile-joined">Member since {joinedDate}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <p className="stat-value">—</p>
          <p className="stat-label">Activities Created</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">—</p>
          <p className="stat-label">Activities Joined</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">—</p>
          <p className="stat-label">Meetings IRL</p>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Account</h3>
        <div className="profile-info-row">
          <span className="info-label">Telegram ID</span>
          <span className="info-value">{user.telegramId}</span>
        </div>
      </div>

      <div className="profile-footer">
        <p className="footer-text">GO IRL v0.1.0 · Sprint 1</p>
      </div>
    </div>
  );
}
