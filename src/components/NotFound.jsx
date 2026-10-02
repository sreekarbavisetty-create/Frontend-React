import { Link } from 'react-router-dom';
import { PATHS } from '../routes/paths';

/**
 * NotFound Component (Slide 6 & 7)
 * Rendered for any unmapped route path (path="*").
 * Distinct from data-level "Project Not Found".
 */
function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code">404</div>
        <h2>Page Not Found</h2>
        <p className="not-found-description">
          The URL you navigated to does not exist or has been moved. Check the address
          or return to the dashboard.
        </p>
        <div className="not-found-actions">
          <Link to={PATHS.dashboard} className="btn-primary">
            🏠 Back to Dashboard
          </Link>
          <Link to={PATHS.projects} className="btn-secondary">
            📁 View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
