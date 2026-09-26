/**
 * EmptyState Component
 * Shown when there are no task rows in the estimation table.
 * 
 * Slide 13: "No rows at all: show an empty state, not an empty table"
 * Slide 8: Tells the user what to do next with a clear call-to-action.
 */
function EmptyState({ onAddTask }) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">📝</div>
      <h3>No tasks added yet</h3>
      <p>
        Your estimate has no line items. Add your first task to start tracking hours
        and calculating live costs.
      </p>
      <button
        type="button"
        className="btn-primary"
        onClick={onAddTask}
      >
        + Add Your First Task
      </button>
    </div>
  );
}

export default EmptyState;
