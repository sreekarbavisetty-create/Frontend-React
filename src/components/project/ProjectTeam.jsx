import { useOutletContext } from 'react-router-dom';

/**
 * ProjectTeam Component
 * Displays team members and staffing allocated to the project.
 */
function ProjectTeam() {
  const { project, users } = useOutletContext();

  return (
    <div className="team-tab-panel">
      <div className="team-card">
        <h3>Assigned Project Team</h3>
        <p className="subtitle">Personnel and technical contributors assigned to this engagement.</p>

        <div className="team-grid">
          {users.map((user) => {
            const isOwner = user.name === project.owner;
            return (
              <div key={user.id} className={`team-member-card ${isOwner ? 'lead-member' : ''}`}>
                <div className="member-avatar">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="member-info">
                  <h4>{user.name} {isOwner && <span className="lead-tag">Project Lead</span>}</h4>
                  <p>{user.role || 'Contributor'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectTeam;
