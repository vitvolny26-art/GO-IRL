import { useState, useEffect } from 'react';
import { useTelegramAuth } from './hooks/useTelegramAuth';
import { useActivityDetails } from './hooks/useActivityDetails';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { ActivitiesListPage } from './pages/ActivitiesListPage';
import { ActivityDetailsPage } from './pages/ActivityDetailsPage';
import { CreateActivityPage } from './pages/CreateActivityPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider, useToast } from './components/Toast';
import { joinActivity, leaveActivity, clearSession } from './services/api';
import './App.css';

type Page =
  | { name: 'list' }
  | { name: 'details'; activityId: string }
  | { name: 'create' }
  | { name: 'profile' };

function AppInner() {
  const { user, loading, error, login } = useTelegramAuth();
  const [appReady, setAppReady] = useState(false);
  const [page, setPage] = useState<Page>({ name: 'list' });
  const { showToast } = useToast();

  const initData = window.Telegram?.WebApp?.initData ?? '';

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
    setAppReady(true);
  }, []);

  if (!appReady || loading) {
    return (
      <div className="loading">
        <p>Initializing…</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={login} error={error} />;
  }

  if (page.name === 'profile') {
    return (
      <ProfilePage
        user={user}
        onBrowse={() => setPage({ name: 'list' })}
        onLogout={() => {
          clearSession();
          window.location.reload();
        }}
      />
    );
  }

  if (page.name === 'create') {
    return (
      <CreateActivityPage
        initData={initData}
        onSuccess={(id) => {
          showToast('Activity created!', 'success');
          setPage({ name: 'details', activityId: id });
        }}
        onBack={() => setPage({ name: 'list' })}
      />
    );
  }

  if (page.name === 'details') {
    return (
      <ActivityDetailView
        activityId={page.activityId}
        currentUserId={user.id}
        initData={initData}
        onBack={() => setPage({ name: 'list' })}
        showToast={showToast}
      />
    );
  }

  return (
    <ActivitiesListPage
      onSelectActivity={(id) => setPage({ name: 'details', activityId: id })}
      onCreateActivity={() => setPage({ name: 'create' })}
      onProfile={() => setPage({ name: 'profile' })}
    />
  );
}

interface ActivityDetailViewProps {
  activityId: string;
  currentUserId: string;
  initData: string;
  onBack: () => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

function ActivityDetailView({
  activityId,
  currentUserId,
  initData,
  onBack,
  showToast,
}: ActivityDetailViewProps) {
  const { activity, loading, error, refetch } = useActivityDetails(activityId);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading…</p>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="loading">
        <p>⚠️ {error ?? 'Activity not found'}</p>
        <button
          style={{
            marginTop: 12,
            color: '#6C63FF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <ActivityDetailsPage
      activity={activity}
      currentUserId={currentUserId}
      initData={initData}
      onJoin={async () => {
        await joinActivity(activityId, initData);
        showToast('Joined successfully!', 'success');
        refetch();
      }}
      onLeave={async () => {
        await leaveActivity(activityId, initData);
        showToast('Left activity', 'info');
        refetch();
      }}
      onBack={onBack}
    />
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </ErrorBoundary>
  );
}
