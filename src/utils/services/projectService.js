import { api } from './apiClient';

/**
 * projectService.js - Knows projects, not HTTP (Slide 9 & 13)
 * Named after intent, not mechanism.
 */

/**
 * Fetches all projects from GET /projects
 * Accepts options (such as signal for AbortController and custom query path).
 */
export const getProjects = (options = {}) => {
  const endpoint = options.path || '/projects';
  return api.get(endpoint, options);
};

/**
 * Fetches all users from GET /users
 * Used to resolve ownerId to full user names.
 */
export const getUsers = (options = {}) => {
  const endpoint = options.path || '/users';
  return api.get(endpoint, options);
};
