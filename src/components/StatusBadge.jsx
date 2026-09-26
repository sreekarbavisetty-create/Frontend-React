/**
 * StatusBadge Component (Functional Component)
 * Displays the project's status with color coding.
 * Provides a fallback badge style for any unexpected / unseen status.
 */
function StatusBadge({ status }) {
  // Mapping known statuses to CSS class names
  const statusClasses = {
    'In Progress': 'badge-in-progress',
    'Completed': 'badge-completed',
    'On Hold': 'badge-on-hold',
    'Planning': 'badge-planning',
    'Cancelled': 'badge-cancelled',
  };

  // Fallback to 'badge-default' if status is unknown or unseen
  const badgeClass = statusClasses[status] || 'badge-default';

  return (
    <span className={`status-badge ${badgeClass}`}>
      {status || 'Unknown'}
    </span>
  );
}

export default StatusBadge;
