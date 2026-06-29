import type { User } from '../types/user';
import '../styles/ProfilePage.css';

interface ProfilePageProps {
  user: User;
}

export function ProfilePage({ user }: ProfilePageProps) {
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'User';

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>🏐 GO IRL</h1>
        {user.profileImage && (
          <img src={user.profileImage} alt="Profile" className="profile-avatar" />
        )}
        <div className="profile-details">
          <h2 className="profile-name">{displayName}</h2>
          {user.username && <p className="profile-username">@{user.username}</p>}
        </div>
      </div>

      <div className="profile-status">
        <div className="status-badge">✅ Profile Created</div>
        <p className="status-text">You're all set! Ready to find activities?</p>
      </div>

      <div className="profile-content">
        <h3>Coming Next</h3>
        <ul className="feature-list">
          <li>Browse nearby activities</li>
          <li>Join activities</li>
          <li>Real-time chat</li>
          <li>Activity calendar</li>
        </ul>
      </div>

      <div className="profile-footer">
        <p className="footer-text">Version 0.0.1 • Sprint 1</p>
      </div>
    </div>
  );
}
