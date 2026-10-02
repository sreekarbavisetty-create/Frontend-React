import { useOutletContext } from 'react-router-dom';
import { formatCost } from '../../utils/formatters';

/**
 * ProjectEstimate Component (Slide 6 Core Challenge)
 * Opened directly by deep link: /projects/:projectId/estimate
 */
function ProjectEstimate() {
  const { project } = useOutletContext();

  // Modular line items representing the project's estimate
  const estimateLineItems = [
    {
      id: 1,
      module: 'Architecture & System Design',
      role: 'Senior Architect',
      rate: 1800,
      hours: Math.round((project.totalHours || 100) * 0.25),
    },
    {
      id: 2,
      module: 'Core Feature Development',
      role: 'Software Developer',
      rate: 1200,
      hours: Math.round((project.totalHours || 100) * 0.5),
    },
    {
      id: 3,
      module: 'QA, Automated Testing & Verification',
      role: 'QA Engineer',
      rate: 800,
      hours: Math.round((project.totalHours || 100) * 0.25),
    },
  ];

  return (
    <div className="estimate-tab-panel">
      {/* Deep Link Info Banner */}
      <div className="deep-link-banner">
        <span className="banner-icon">🔗</span>
        <div className="banner-text">
          <strong>Deep Link Active:</strong> This screen survived direct URL navigation & refresh at{' '}
          <code>/projects/{project.id}/estimate</code>.
        </div>
      </div>

      <div className="estimate-card">
        <div className="estimate-header">
          <div>
            <h3>Estimate Line Items & Deliverables</h3>
            <p className="subtitle">
              Interactive work breakdown structure for {project.name}.
            </p>
          </div>
          <div className="estimate-total-pill">
            Total Cost: <strong>{formatCost(project.finalCost)}</strong>
          </div>
        </div>

        <div className="table-responsive">
          <table className="estimation-table">
            <thead>
              <tr>
                <th>Deliverable Module</th>
                <th>Assigned Role</th>
                <th style={{ textAlign: 'right' }}>Billing Rate</th>
                <th style={{ textAlign: 'right' }}>Hours</th>
                <th style={{ textAlign: 'right' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {estimateLineItems.map((item) => {
                const subtotal = item.hours * item.rate;
                return (
                  <tr key={item.id}>
                    <td><strong>{item.module}</strong></td>
                    <td>{item.role}</td>
                    <td style={{ textAlign: 'right' }}>Rs {item.rate}/hr</td>
                    <td style={{ textAlign: 'right' }}>{item.hours} hrs</td>
                    <td style={{ textAlign: 'right', color: '#059669', fontWeight: 'bold' }}>
                      {formatCost(subtotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectEstimate;
