import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

/**
 * AppLayout Component (Slide 3 & 6)
 * Rendered once for every screen.
 * Displays persistent sidebar with logged-in user details and logout action.
 */
function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate(PATHS.login);
  }

  return (
    <div className="layout-container">
      {/* Persistent Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">Cost Estimator Pro</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to={PATHS.dashboard}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to={PATHS.projects}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📁</span>
            <span>Projects</span>
          </NavLink>

          <NavLink
            to={PATHS.projectNew}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">➕</span>
            <span>New Project</span>
          </NavLink>
        </nav>

        {/* User Badge with Logout */}
        <div className="sidebar-footer">
          <div className="user-badge">
            <div className="avatar">{user?.avatar || '👤'}</div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Guest User'}</span>
              <span className="user-role">{user?.title || user?.role || 'Staff'}</span>
            </div>
            <button
              type="button"
              className="btn-logout"
              onClick={handleLogout}
              title="Sign Out"
              aria-label="Sign Out"
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area: Renders current route inside <Outlet /> */}
      <div className="main-content-wrapper">
        <header className="topbar">
          <div className="topbar-breadcrumb">
            <span>Portfolio Manager</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Application Workspace</span>
          </div>
          <div className="topbar-user-pill">
            <span>Logged in as: <strong>{user?.name}</strong> ({user?.role})</span>
          </div>
        </header>

        <main className="content-outlet">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
