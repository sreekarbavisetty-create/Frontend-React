import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DUMMY_ACCOUNTS } from '../../data/dummyAccounts';
import { PATHS } from '../../routes/paths';

/**
 * Login Component (Day 4 Authentication)
 * Features:
 * - Credentials login
 * - Quick 1-click test buttons for the 2 dummy accounts
 * - Deep link return redirection via location.state.from
 */
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Target destination after login (deep link preservation, Slide 6)
  const destination = location.state?.from?.pathname || PATHS.dashboard;

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      login(email, password);
      // Redirect to original requested page using replace
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  // Quick 1-click login for demonstration
  function handleQuickLogin(account) {
    setError(null);
    try {
      login(account.email, account.password);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-brand-icon">⚡</div>
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your Cost Estimator workspace</p>
        </div>

        {/* Deep link info pill if arriving from a guarded link */}
        {location.state?.from && (
          <div className="deep-link-notice">
            🔒 Log in to access: <code>{location.state.from.pathname}</code>
          </div>
        )}

        {/* Error Alert */}
        {error && <div className="login-error-alert">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              required
              className="table-input"
              placeholder="e.g. sreekar@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              required
              className="table-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary btn-login-submit">
            Sign In →
          </button>
        </form>

        {/* Quick Demo Accounts Helper */}
        <div className="demo-accounts-box">
          <div className="demo-header">
            <span>⚡ Quick 1-Click Demo Login</span>
          </div>

          <div className="demo-buttons">
            {DUMMY_ACCOUNTS.map((acc) => (
              <button
                key={acc.id}
                type="button"
                className="btn-demo-account"
                onClick={() => handleQuickLogin(acc)}
              >
                <div className="demo-avatar">{acc.avatar}</div>
                <div className="demo-meta">
                  <div className="demo-name">{acc.name}</div>
                  <div className="demo-role">{acc.title}</div>
                </div>
                <span className="demo-arrow">Login →</span>
              </button>
            ))}
          </div>

          <div className="demo-credentials-hint">
            Default password for all accounts: <code>password123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
