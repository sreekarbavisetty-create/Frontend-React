import { ROLES } from '../../data/rolesData';
import { formatRowCost } from './taskHelpers';

/**
 * TaskRow Component
 * Renders a single row in the estimation table:
 * - Employee Name (text input)
 * - Task Description (text input)
 * - Role Select (dropdown with unselected placeholder)
 * - Est. Hours (number input)
 * - Read-only Cost (live calculated, dash if 0 hours or unselected role)
 * - Delete Button (calls onDelete)
 */
function TaskRow({ task, onFieldChange, onDelete }) {
  const rowCostDisplay = formatRowCost(task);

  return (
    <tr className="task-row">
      {/* Employee Name */}
      <td className="col-employee">
        <input
          type="text"
          className="table-input"
          placeholder="e.g. Sreekar"
          value={task.employeeName}
          onChange={(e) => onFieldChange(task.id, 'employeeName', e.target.value)}
        />
      </td>

      {/* Task Description */}
      <td className="col-name">
        <input
          type="text"
          className="table-input"
          placeholder="e.g. Build login screen"
          value={task.name}
          onChange={(e) => onFieldChange(task.id, 'name', e.target.value)}
        />
      </td>

      {/* Role Select Dropdown (Empty by default with placeholder) */}
      <td className="col-role">
        <select
          className={`table-select ${!task.roleId ? 'placeholder-selected' : ''}`}
          value={task.roleId}
          onChange={(e) => onFieldChange(task.id, 'roleId', e.target.value)}
        >
          <option value="" disabled>
            -- Select Role --
          </option>
          {Object.values(ROLES).map((role) => (
            <option key={role.id} value={role.id}>
              {role.name} (Rs {role.hourlyRate}/hr)
            </option>
          ))}
        </select>
      </td>

      {/* Hours Input */}
      <td className="col-hours">
        <input
          type="number"
          className="table-input hours-input"
          min="0"
          step="any"
          placeholder="0"
          value={task.hours}
          onChange={(e) => onFieldChange(task.id, 'hours', e.target.value)}
        />
      </td>

      {/* Read-only Live Cost */}
      <td className="col-cost">
        <span className={`cost-text ${rowCostDisplay === '—' ? 'cost-zero' : ''}`}>
          {rowCostDisplay}
        </span>
      </td>

      {/* Delete Action Button */}
      <td className="col-actions">
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
          aria-label="Delete task"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TaskRow;
