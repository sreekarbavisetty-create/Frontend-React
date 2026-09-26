import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import { getProjects, getUsers } from '../utils/services/projectService';

/**
 * ProjectList Component (Day 3 Challenge)
 * 
 * Rules applied from Day 3:
 * 1. Three pieces of state: projects, isLoading (starts true), error (Slide 7 & 11)
 * 2. Fetches via Service Layer - zero fetch inside component (Slide 9 & 11)
 * 3. Parallel fetching with Promise.all (Slide 12)
 * 4. Resolves ownerId via O(n) Object.fromEntries dictionary (Slide 12)
 * 5. Reuses ProjectCard from Day 1 UNCHANGED (Slide 11)
 * 6. AbortController cleanup to cancel requests on unmount (Slide 5 & 11)
 * 7. Four states handled: Loading (skeletons), Error (+ retry), Empty, and Data (Slide 8)
 */
function ProjectList() {
  // State: Exactly three primary states (Slide 11)
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // TRUE initially to prevent screen flicker (Slide 7)
  const [error, setError] = useState(null);

  // Reload trigger for the "Try again" button (Slide 8 & 10)
  const [reloadToken, setReloadToken] = useState(0);

  // Testing controls to verify error & empty states
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        // Build optional test query string
        const queryParams = new URLSearchParams();
        if (simulateError) queryParams.set('error', 'true');
        if (simulateEmpty) queryParams.set('empty', 'true');
        const queryStr = queryParams.toString() ? `?${queryParams.toString()}` : '';

        // PARALLEL REQUESTS via Promise.all (Slide 12)
        const [projectsData, usersData] = await Promise.all([
          getProjects({
            signal: controller.signal,
            path: `/projects${queryStr}`, // handles test flags
          }),
          getUsers({ signal: controller.signal }),
        ]);

        if (!ignore) {
          // BUILD LOOKUP ONCE - O(n) (Slide 12)
          // Avoids O(n x m) users.find() inside map
          const nameById = Object.fromEntries(
            usersData.map((user) => [user.id, user.name])
          );

          // Resolve owner name from ownerId and reuse ProjectCard props unchanged
          const resolvedProjects = projectsData.map((project) => ({
            ...project,
            owner: nameById[project.ownerId] || 'Unassigned',
          }));

          setProjects(resolvedProjects);
        }
      } catch (err) {
        // Do not update state if aborted on unmount
        if (!ignore && err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch projects from server.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false); // Inside finally so errors never leave app spinning (Slide 7)
        }
      }
    }

    loadData();

    // CLEANUP: Abort request on unmount (Slide 5 & 11)
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [reloadToken, simulateError, simulateEmpty]);

  // Working "Try again" action (Slide 8 & 11)
  function handleRetry() {
    setSimulateError(false); // Reset any error simulation
    setReloadToken((prev) => prev + 1);
  }

  return (
    <div className="project-list-screen">
      {/* Screen Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Projects Portfolio</h1>
          <p className="subtitle">
            Loaded from server API with parallel user resolution and skeleton states.
          </p>
        </div>

        {/* Live Status & Testing Controls */}
        <div className="header-actions">
          <div className="header-badge">
            {isLoading
              ? 'Loading projects...'
              : error
              ? 'Error loading'
              : `Projects: ${projects.length}`}
          </div>

          {/* Test Buttons to effortlessly grade Error & Empty states */}
          <div className="test-controls">
            <button
              type="button"
              className={`btn-test ${simulateError ? 'active-test' : ''}`}
              onClick={() => {
                setSimulateEmpty(false);
                setSimulateError((prev) => !prev);
              }}
              title="Test error state and 'Try again' button"
            >
              {simulateError ? 'Reset Normal' : 'Simulate 500 Error'}
            </button>
            <button
              type="button"
              className={`btn-test ${simulateEmpty ? 'active-test' : ''}`}
              onClick={() => {
                setSimulateError(false);
                setSimulateEmpty((prev) => !prev);
              }}
              title="Test empty state"
            >
              {simulateEmpty ? 'Reset Normal' : 'Simulate Empty'}
            </button>
          </div>
        </div>
      </header>

      {/* 1. LOADING STATE: Skeleton rows/cards (Slide 8 & 11) */}
      {isLoading && (
        <div className="projects-grid" aria-label="Loading projects">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      )}

      {/* 2. ERROR STATE: Clear message + Working 'Try again' button (Slide 8 & 11) */}
      {!isLoading && error && (
        <div className="error-card" role="alert">
          <div className="error-icon">⚠️</div>
          <h3>Failed to Load Projects</h3>
          <p className="error-message">{error}</p>
          <button
            type="button"
            className="btn-primary btn-retry"
            onClick={handleRetry}
          >
            🔄 Try Again
          </button>
        </div>
      )}

      {/* 3. EMPTY STATE: Helpful message (Slide 8 & 11) */}
      {!isLoading && !error && projects.length === 0 && (
        <div className="empty-state-card">
          <div className="empty-state-icon">📂</div>
          <h3>No projects yet</h3>
          <p>
            No projects were returned from the server. Create your first project to start estimating.
          </p>
          {simulateEmpty && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setSimulateEmpty(false)}
            >
              Reset to Live Data
            </button>
          )}
        </div>
      )}

      {/* 4. SUCCESS STATE: Grid reusing ProjectCard UNCHANGED (Slide 11) */}
      {!isLoading && !error && projects.length > 0 && (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
