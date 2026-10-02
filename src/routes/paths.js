/**
 * Application Path Constants (Slide 7 Discipline)
 */
export const PATHS = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  projects: '/projects',
  projectNew: '/projects/new',
  projectDetail: (id = ':projectId') => `/projects/${id}`,
  projectEstimate: (id = ':projectId') => `/projects/${id}/estimate`,
  projectTeam: (id = ':projectId') => `/projects/${id}/team`,
};
