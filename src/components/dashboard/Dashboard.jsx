import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../utils/services/projectService';
import { formatCost } from '../../utils/formatters';
import { PATHS } from '../../routes/paths';

/**
 * Dashboard Component (Slide 3)
 * Overview screen with portfolio health, summary statistics, and quick navigation.
 */
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await getProjects();
        if (!ignore) setProjects(data);
      } catch {
        // silent fallback for dashboard stats
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  const totalCost = projects.reduce((s, p) => s + (Number(p.finalCost) || 0), 0);
  const totalHours = projects.reduce((s, p) => s + (Number(p.totalHours) || 0), 0);
  const inProgressCount = projects.filter(p => p.status === 'In Progress').length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <h2>Executive Portfolio Dashboard</h2>
          <p className="subtitle">
            Real-time status of client engagements, financial forecasts, and resource allocation.
          </p>
        </div>
        <div className="hero-actions">
          <Link to={PATHS.projects} className="btn-secondary">
            View All Projects ({projects.length})
          </Link>
          <Link to={PATHS.projectNew} className="btn-primary">
            + Create New Project
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">Total Projects</span>
          <span className="metric-value">{isLoading ? '...' : projects.length}</span>
          <span className="metric-sub">Active in portfolio</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">In Progress</span>
          <span className="metric-value text-blue">{isLoading ? '...' : inProgressCount}</span>
          <span className="metric-sub">Currently delivering</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Total Estimated Hours</span>
          <span className="metric-value">{isLoading ? '...' : `${totalHours} hrs`}</span>
          <span className="metric-sub">Across all deliverables</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Total Portfolio Value</span>
          <span className="metric-value text-green">{isLoading ? '...' : formatCost(totalCost)}</span>
          <span className="metric-sub">Approved budgets</span>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="dashboard-section">
        <h3>Recent Projects</h3>
        <div className="quick-projects-list">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="quick-project-item">
              <div>
                <strong>{project.name}</strong>
                <span className="quick-client"> • {project.client}</span>
              </div>
              <Link to={PATHS.projectEstimate(project.id)} className="btn-view-link">
                Open Estimate →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
