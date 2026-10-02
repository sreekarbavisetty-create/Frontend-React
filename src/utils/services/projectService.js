import { api } from './apiClient';

/**
 * projectService.js - Knows projects, not HTTP (Slide 9 & 13)
 * Named after intent, not mechanism.
 */

/**
 * Fetches all projects from GET /projects
 */
export const getProjects = (options = {}) => {
  const endpoint = options.path || '/projects';
  return api.get(endpoint, options);
};

/**
 * Fetches a single project by ID from GET /projects/:projectId
 */
export const getProject = (id, options = {}) => {
  return api.get(`/projects/${id}`, options);
};

/**
 * Creates a new project via POST /projects
 */
export const createProject = (projectData, options = {}) => {
  return api.post('/projects', projectData, options);
};

/**
 * Fetches all users from GET /users
 * Used to resolve ownerId to full user names.
 */
export const getUsers = (options = {}) => {
  const endpoint = options.path || '/users';
  return api.get(endpoint, options);
};
