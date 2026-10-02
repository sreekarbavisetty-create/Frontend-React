import { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, Link } from 'react-router-dom';
import StatusBadge from '../StatusBadge';
import { getProject, getUsers } from '../../utils/services/projectService';
import { formatCost } from '../../utils/formatters';
import { PATHS } from '../../routes/paths';

/**
 * ProjectDetail Component (Slide 3 & 6)
 * Parent layout for a specific project.
 * Refetches when `projectId` changes.
 * Displays persistent project header and nested tabs (Overview, Estimate, Team).
 */
function ProjectDetail() {
  const { projectId } = useParams(); // Route param (Slide 4)
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function loadProject() {
      setIsLoading(true);
      setError(null);
      setNotFound(false);

      try {
        // Parallel fetch for project and users
        const [projData, usersData] = await Promise.all([
          getProject(projectId, { signal: controller.signal }),
          getUsers({ signal: controller.signal }),
        ]);

        if (!ignore) {
          // Resolve owner name
          const nameById = Object.fromEntries(usersData.map((u) => [u.id, u.name]));
          setProject({
            ...projData,
            owner: nameById[projData.ownerId] || 'Unassigned',
          });
          setUsers(usersData);
        }
      } catch (err) {
        if (!ignore && err.name !== 'AbortError') {
          // Check for 404 (Data layer Not Found, Slide 6 & 7)
          if (err.message && err.message.includes('404')) {
            setNotFound(true);
          } else {
            setError(err.message || 'Failed to load project details');
          }
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadProject();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [projectId]); // Refetches when projectId changes (Slide 4)

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="project-detail-loading" aria-busy="true">
        <div className="skeleton-bar" style={{ width: '30%', height: '2rem', marginBottom: '1rem' }} />
        <div className="skeleton-bar" style={{ width: '60%', height: '1.25rem', marginBottom: '2rem' }} />
        <div className="skeleton-bar" style={{ width: '100%', height: '300px' }} />
      </div>
    );
  }

  // 2. Project Not Found State (Slide 6 & 7)
  if (notFound || !project) {
    return (
      <div className="project-not-found-card">
        <div className="not-found-icon">🔍</div>
        <h2>Project Not Found</h2>
        <p>
          We could not find any project with ID: <code>{projectId}</code>.
          It may have been deleted or the URL might be mistyped.
        </p>
        <Link to={PATHS.projects} className="btn-primary">
          ← Back to All Projects
        </Link>
      </div>
    );
  }

  // 3. Generic Error State
  if (error) {
    return (
      <div className="error-card">
        <h3>Error Loading Project</h3>
        <p>{error}</p>
        <Link to={PATHS.projects} className="btn-primary">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      {/* Breadcrumb Navigation */}
      <nav className="detail-breadcrumbs">
        <Link to={PATHS.projects} className="breadcrumb-link">Projects</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-active">{project.name}</span>
      </nav>

      {/* Persistent Project Header (never re-renders between sub-tabs) */}
      <div className="project-detail-header">
        <div className="header-meta">
          <div className="title-row">
            <h1>{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="project-client">Client: <strong>{project.client}</strong> • Lead: <strong>{project.owner}</strong></p>
        </div>
        <div className="header-cost-box">
          <span className="cost-label">Estimated Budget</span>
          <span className="cost-amount">{formatCost(project.finalCost)}</span>
        </div>
      </div>

      {/* Nested Tabs with NavLink for active tab highlighting (Slide 5 & 6) */}
      <div className="project-sub-tabs">
        <NavLink
          to={PATHS.projectDetail(projectId)}
          end
          className={({ isActive }) => `sub-tab ${isActive ? 'active' : ''}`}
        >
          Overview
        </NavLink>
        <NavLink
          to={PATHS.projectEstimate(projectId)}
          className={({ isActive }) => `sub-tab ${isActive ? 'active' : ''}`}
        >
          Estimate Breakdown
        </NavLink>
        <NavLink
          to={PATHS.projectTeam(projectId)}
          className={({ isActive }) => `sub-tab ${isActive ? 'active' : ''}`}
        >
          Team Members
        </NavLink>
      </div>

      {/* Outlet renders the child route (Overview, Estimate, or Team) */}
      <div className="sub-tab-content">
        <Outlet context={{ project, users }} />
      </div>
    </div>
  );
}

export default ProjectDetail;
