import { useOutletContext } from 'react-router-dom';
import { formatDateRange, formatCost } from '../../utils/formatters';

/**
 * ProjectOverview Component
 * Renders high-level project timeline, description, and key performance metrics.
 */
function ProjectOverview() {
  const { project } = useOutletContext();

  return (
    <div className="overview-tab-panel">
      <div className="overview-card">
        <h3>Project Description</h3>
        <p className="description-text">
          {project.description || 'No detailed scope of work provided for this project.'}
        </p>

        <div className="overview-metrics-grid">
          <div className="overview-metric">
            <span className="label">Timeline</span>
            <span className="val">{formatDateRange(project.startDate, project.endDate)}</span>
          </div>
          <div className="overview-metric">
            <span className="label">Planned Hours</span>
            <span className="val">{project.totalHours} hrs</span>
          </div>
          <div className="overview-metric">
            <span className="label">Cost Forecast</span>
            <span className="val">{formatCost(project.finalCost)}</span>
          </div>
          <div className="overview-metric">
            <span className="label">Client Account</span>
            <span className="val">{project.client}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectOverview;
