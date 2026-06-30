interface LoginPageProps {
  onLogin: () => void;
  error: string | null;
}

export function LoginPage({ onLogin, error }: LoginPageProps) {
  return (
    <div className="login-container">
      <h1>🏐 GO IRL</h1>
      <p>Go outside. Meet people. Live more.</p>
      {error && <p className="error">{error}</p>}
      <button onClick={onLogin}>Login with Telegram</button>
    </div>
  );
}
