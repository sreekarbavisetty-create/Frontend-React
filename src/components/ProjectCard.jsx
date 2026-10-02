import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import DetailRow from './DetailRow';
import { formatCost, formatDateRange } from '../utils/formatters';
import { PATHS } from '../routes/paths';

/**
 * ProjectCard Component
 * Takes a single `project` prop and renders all required project details:
 * Name, Client, StatusBadge, Owner, Date Range, Total Hours, and Final Cost.
 * 
 * Features Card Navigation (Slide 6 & Day 4 Challenge):
 * Clicking title or action link navigates directly to /projects/:projectId/estimate.
 */
function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  const {
    id,
    name,
    client,
    status,
    owner,
    startDate,
    endDate,
    totalHours,
    finalCost,
  } = project;

  // Format date range and Indian currency using pure utility functions
  const formattedDates = formatDateRange(startDate, endDate);
  const formattedCost = formatCost(finalCost);
  const hoursDisplay = totalHours != null ? `${totalHours} hrs` : 'N/A';

  return (
    <div className="project-card">
      {/* Card Header: Project Name (as Link) & Reusable Status Badge */}
      <div className="card-header">
        <h3 className="project-name" title={name}>
          <Link to={PATHS.projectEstimate(id)} className="project-name-link">
            {name}
          </Link>
        </h3>
        <StatusBadge status={status} />
      </div>

      {/* Card Body: Reusable DetailRows */}
      <div className="card-body">
        <DetailRow label="Client" value={client || 'N/A'} />
        <DetailRow label="Owner" value={owner || 'Unassigned'} />
        <DetailRow label="Date Range" value={formattedDates} />
        <DetailRow label="Total Hours" value={hoursDisplay} />
        <DetailRow
          label="Final Estimated Cost"
          value={formattedCost}
          isHighlighted={true}
        />
      </div>

      {/* Card Footer: Navigation Link to Project Details & Estimate */}
      <div className="card-footer">
        <Link to={PATHS.projectEstimate(id)} className="btn-card-nav">
          View Estimate & Details →
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
