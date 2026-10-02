import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../utils/services/projectService';
import { PATHS } from '../../routes/paths';

/**
 * ProjectForm Component (Slide 5 & 6)
 * Handles creating a new project.
 * Programmatic Navigation: After successful creation, navigates to /projects/:id/estimate.
 */
function ProjectForm() {
  const navigate = useNavigate(); // Programmatic navigation (Slide 5)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Controlled form state (Day 2 concept)
  const [form, setForm] = useState({
    name: '',
    client: '',
    status: 'In Progress',
    ownerId: 'u2',
    totalHours: '',
    finalCost: '',
    description: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Mandatory in SPA (Day 2 Slide 6)
    setIsSubmitting(true);
    setError(null);

    try {
      const created = await createProject({
        ...form,
        totalHours: Number(form.totalHours) || 0,
        finalCost: Number(form.finalCost) || 0,
      });

      // Programmatic navigation directly to the newly created project's estimate screen! (Slide 5 & 6)
      navigate(PATHS.projectEstimate(created.id));
    } catch (err) {
      setError(err.message || 'Failed to create project');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="project-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Create New Project</h2>
          <p className="subtitle">
            Enter project details. Saving will immediately open its interactive estimate screen.
          </p>
        </div>

        {error && <div className="form-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label htmlFor="name">Project Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="table-input"
              placeholder="e.g. NextGen Payment Gateway"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="client">Client Name *</label>
              <input
                id="client"
                name="client"
                type="text"
                required
                className="table-input"
                placeholder="e.g. Stripe Global"
                value={form.client}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Initial Status</label>
              <select
                id="status"
                name="status"
                className="table-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalHours">Estimated Total Hours</label>
              <input
                id="totalHours"
                name="totalHours"
                type="number"
                min="0"
                className="table-input"
                placeholder="e.g. 240"
                value={form.totalHours}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="finalCost">Target Budget (INR)</label>
              <input
                id="finalCost"
                name="finalCost"
                type="number"
                min="0"
                className="table-input"
                placeholder="e.g. 500000"
                value={form.finalCost}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Scope Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="table-input"
              placeholder="Brief summary of requirements, deliverables, and scope..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(PATHS.projects)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create & Open Estimate →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
