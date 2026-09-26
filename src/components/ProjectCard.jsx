import StatusBadge from './StatusBadge';
import DetailRow from './DetailRow';
import { formatCost, formatDateRange } from '../utils/formatters';

/**
 * ProjectCard Component (Functional Component)
 * Takes a single `project` prop and renders all required project details:
 * Name, Client, StatusBadge, Owner, Date Range, Total Hours, and Final Cost.
 */
function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  const {
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
      {/* Card Header: Project Name & Reusable Status Badge */}
      <div className="card-header">
        <h3 className="project-name" title={name}>{name}</h3>
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
    </div>
  );
}

export default ProjectCard;
