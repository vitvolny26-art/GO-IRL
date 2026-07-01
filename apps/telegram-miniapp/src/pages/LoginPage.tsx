interface LoginPageProps {
  onLogin: () => void;
  error: string | null;
}

export function LoginPage({ onLogin, error }: LoginPageProps) {
  return (
    <div className="login-page">
      <div className="login-content">
        <div className="logo">
          <span className="logo-go">GO</span> IRL
        </div>
        <p className="tagline">Go outside. Meet people. Live more.</p>
        {error && <p className="error-message">{error}</p>}
        <button className="login-btn" onClick={onLogin}>
          Войти через Telegram
        </button>
      </div>
    </div>
  );
}
