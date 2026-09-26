/**
 * apiClient.js - Knows HTTP, not projects (Slide 9 & 13)
 * Centralizes base URL, error mapping, and status checking.
 */
const BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Maps HTTP status codes to human-readable errors (Slide 6 & 9)
 */
function errorFor(status) {
  switch (status) {
    case 400:
      return new Error('Bad Request (400) - Invalid parameters provided.');
    case 401:
      return new Error('Unauthorized (401) - Please log in to continue.');
    case 403:
      return new Error('Forbidden (403) - You do not have permission to view this.');
    case 404:
      return new Error('Not Found (404) - The requested resource could not be found.');
    case 500:
      return new Error('Server Error (500) - The server encountered an unexpected error.');
    default:
      return new Error(`Request failed with status code ${status}`);
  }
}

/**
 * Generic request wrapper
 * Always checks response.ok (Slide 6 & 13)
 */
async function request(path, { method = 'GET', body, signal, headers = {} } = {}) {
  const options = {
    method,
    signal,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(BASE + path, options);

  // Fetch does NOT throw on 404 or 500 - check response.ok explicitly (Slide 6)
  if (!res.ok) {
    throw errorFor(res.status);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export const api = {
  get: (path, options = {}) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options = {}) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options = {}) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options = {}) => request(path, { ...options, method: 'DELETE' }),
};
