import { useState } from 'react';
import ProjectCard from './components/ProjectCard';
import { projectsData } from './data/projectsData';
import './App.css';

/**
 * Main App Component (Functional Component)
 * Manages projects state and renders a ProjectCard for each project.
 */
function App() {
  const [projects] = useState(projectsData);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Projects Portfolio</h1>
          <p className="subtitle">
            Scan projects at a glance — track client, status, timeline, hours, and estimated cost.
          </p>
        </div>
        <div className="header-badge">
          Total Projects: <strong>{projects.length}</strong>
        </div>
      </header>

      {/* Projects Cards Grid */}
      <main className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </main>
    </div>
  );
}

export default App;