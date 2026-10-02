import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

/**
 * ProtectedRoute Component (Slide 5)
 * Guards authenticated routes.
 * 
 * Three details that matter (Slide 5):
 * 1. isLoading first - avoids bouncing a logged-in user to /login on page refresh.
 * 2. replace - so back button does not return to a page they cannot see.
 * 3. Preserves location.state.from for seamless deep-link redirection after login.
 */
function ProtectedRoute({ allow }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-spinner" />
        <p>Verifying secure session...</p>
      </div>
    );
  }

  // Not logged in: Redirect to /login, remembering where they were trying to go!
  if (!user) {
    return <Navigate to={PATHS.login} state={{ from: location }} replace />;
  }

  // Role authorization check (if specified)
  if (allow && !allow.includes(user.role)) {
    return <Navigate to={PATHS.dashboard} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
