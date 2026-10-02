import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../components/auth/Login';
import AppLayout from '../components/layout/AppLayout';
import Dashboard from '../components/dashboard/Dashboard';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/project/ProjectForm';
import ProjectDetail from '../components/project/ProjectDetail';
import ProjectOverview from '../components/project/ProjectOverview';
import ProjectEstimate from '../components/project/ProjectEstimate';
import ProjectTeam from '../components/project/ProjectTeam';
import NotFound from '../components/NotFound';
import { PATHS } from './paths';

/**
 * Centralized Route Map (Slide 3, 5 & 7 Discipline)
 * Defines the entire application tree in one file.
 * Includes Public /login route and Protected AppLayout routes.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Public Route: Login Screen */}
      <Route path={PATHS.login} element={<Login />} />

      {/* Protected Routes (Slide 5): ProtectedRoute guards all app screens */}
      <Route element={<ProtectedRoute />}>
        {/* Layout Route: AppLayout renders sidebar and topbar once */}
        <Route element={<AppLayout />}>
          {/* Redirect root / to /dashboard using replace (Slide 3 & 7) */}
          <Route path={PATHS.home} element={<Navigate to={PATHS.dashboard} replace />} />
          
          {/* Main top-level screens */}
          <Route path={PATHS.dashboard} element={<Dashboard />} />
          <Route path={PATHS.projects} element={<ProjectList />} />
          <Route path={PATHS.projectNew} element={<ProjectForm />} />

          {/* Nested routes under /projects/:projectId (Slide 3 & 6) */}
          <Route path={PATHS.projectDetail()} element={<ProjectDetail />}>
            <Route index element={<ProjectOverview />} />
            <Route path="estimate" element={<ProjectEstimate />} />
            <Route path="team" element={<ProjectTeam />} />
          </Route>
        </Route>
      </Route>

      {/* Global 404 Route for unknown URLs (Slide 3, 6 & 7) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
