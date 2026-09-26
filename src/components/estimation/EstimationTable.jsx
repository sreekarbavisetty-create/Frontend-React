import { useState } from 'react';
import TaskRow from './TaskRow';
import SummaryBar from './SummaryBar';
import EmptyState from './EmptyState';
import {
  createEmptyTask,
  getTaskCost,
  INITIAL_TASKS,
} from './taskHelpers';

/**
 * EstimationTable Component (Day 2 Challenge)
 */
function EstimationTable() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // Derived values - zero extra state (Slide 5 & 13)
  const taskCount = tasks.length;
  const isEmpty = taskCount === 0;
  const totalHours = tasks.reduce((sum, t) => sum + (parseFloat(t.hours) || 0), 0);
  const totalCost = tasks.reduce((sum, t) => sum + getTaskCost(t), 0);

  // ADD: Appends empty row from factory function (Slide 9 & 14)
  function handleAddTask() {
    setTasks((prev) => [...prev, createEmptyTask()]);
  }

  // UPDATE: One handler for all fields using computed property (Slide 7, 9, 14)
  function handleTaskChange(taskId, field, value) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, [field]: value } : t))
    );
  }

  // DELETE: Filter out by stable id (Slide 9 & 13)
  function handleDeleteTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  return (
    <div className="estimation-module">
      {/* Module Top Bar */}
      <div className="module-header">
        <div>
          <h2>Interactive Cost Estimator</h2>
          <p className="subtitle">
            Add task rows, enter employee names, assign roles, and watch totals calculate live.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={handleAddTask}
        >
          + Add Task
        </button>
      </div>

      {/* Main Content: Table or Empty State */}
      {isEmpty ? (
        <EmptyState onAddTask={handleAddTask} />
      ) : (
        <div className="table-responsive">
          <table className="estimation-table">
            <thead>
              <tr>
                <th className="th-employee">Employee Name</th>
                <th className="th-name">Task Description</th>
                <th className="th-role">Role</th>
                <th className="th-hours">Est. Hours</th>
                <th className="th-cost">Cost</th>
                <th className="th-actions">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onFieldChange={handleTaskChange}
                  onDelete={handleDeleteTask}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Live Summary Bar */}
      <SummaryBar
        taskCount={taskCount}
        totalHours={totalHours}
        totalCost={totalCost}
      />
    </div>
  );
}

export default EstimationTable;
