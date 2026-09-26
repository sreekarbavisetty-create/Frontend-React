import { formatCost } from '../../utils/formatters';

/**
 * SummaryBar Component
 * Displays live derived totals:
 * - Total Tasks
 * - Total Hours
 * - Total Estimated Cost
 * 
 * Slide 5 & 15: All totals are derived from tasks during render. Zero extra state.
 */
function SummaryBar({ taskCount, totalHours, totalCost }) {
  // Format total hours nicely (e.g. 82 or 82.5)
  const formattedHours = Number.isInteger(totalHours)
    ? totalHours
    : totalHours.toFixed(1);

  return (
    <div className="estimation-summary-bar">
      <div className="summary-stat">
        <span className="summary-label">Total Tasks</span>
        <span className="summary-value">{taskCount}</span>
      </div>

      <div className="summary-divider" />

      <div className="summary-stat">
        <span className="summary-label">Total Hours</span>
        <span className="summary-value">{formattedHours} hrs</span>
      </div>

      <div className="summary-divider" />

      <div className="summary-stat summary-cost">
        <span className="summary-label">Total Estimated Cost</span>
        <span className="summary-value cost-value">
          {totalCost > 0 ? formatCost(totalCost) : "—"}
        </span>
      </div>
    </div>
  );
}

export default SummaryBar;
