/**
 * ROLES dictionary keyed by roleId for O(1) lookup.
 * Configured with Frontend, Backend, Tester, Designer, and Project Manager.
 */
export const ROLES = {
  frontend: {
    id: "frontend",
    name: "Frontend Developer",
    hourlyRate: 1000,
  },
  backend: {
    id: "backend",
    name: "Backend Developer",
    hourlyRate: 1200,
  },
  tester: {
    id: "tester",
    name: "QA / Tester",
    hourlyRate: 800,
  },
  designer: {
    id: "designer",
    name: "UI/UX Designer",
    hourlyRate: 900,
  },
  pm: {
    id: "pm",
    name: "Project Manager",
    hourlyRate: 1500,
  },
};

export const DEFAULT_ROLE_ID = "frontend";
