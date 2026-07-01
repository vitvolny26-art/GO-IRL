import { useState, useEffect } from 'react';
import { useTelegramAuth } from './hooks/useTelegramAuth';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import './App.css';

export function App() {
  const { user, loading, error, login } = useTelegramAuth();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      setAppReady(true);
    }
  }, []);

  if (!appReady || loading) {
    return (
      <div className="loading">
        <p>Initializing...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={login} error={error} />;
  }

  return <ProfilePage user={user} />;
}
