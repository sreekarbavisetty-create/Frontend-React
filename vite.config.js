import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

/**
 * Mock Backend Data for Day 3 Assessment:
 * Projects have ownerId (e.g. "u1", "u2") which must be resolved via GET /users.
 */
const mockUsers = [
  { id: 'u1', name: 'Anita Rao', role: 'Engineering Lead' },
  { id: 'u2', name: 'B. Venkat Sreekar', role: 'Full Stack Developer' },
  { id: 'u3', name: 'Priya Sharma', role: 'Product Manager' },
  { id: 'u4', name: 'Rahul Verma', role: 'DevOps Architect' },
  { id: 'u5', name: 'Vikram Malhotra', role: 'QA Lead' },
];

const mockProjects = [
  {
    id: 'proj-101',
    name: 'Enterprise Cloud Migration',
    client: 'Acme Technologies',
    status: 'In Progress',
    ownerId: 'u2', // Resolves to B. Venkat Sreekar
    startDate: '2026-09-01',
    endDate: '2026-12-15',
    totalHours: 320,
    finalCost: 530332,
  },
  {
    id: 'proj-102',
    name: 'Customer Support AI Chatbot',
    client: 'FinServe Global',
    status: 'Completed',
    ownerId: 'u1', // Resolves to Anita Rao
    startDate: '2026-06-10',
    endDate: '2026-08-30',
    totalHours: 180,
    finalCost: 285400,
  },
  {
    id: 'proj-103',
    name: 'Logistics Fleet Tracker',
    client: 'LogiTrans India',
    status: 'On Hold',
    ownerId: 'u4', // Resolves to Rahul Verma
    startDate: '2026-10-01',
    endDate: '2027-01-20',
    totalHours: 95,
    finalCost: 0, // Shows "Not estimated"
  },
  {
    id: 'proj-104',
    name: 'MediCare Telehealth App',
    client: 'MediCare Plus',
    status: 'Planning',
    ownerId: 'u3', // Resolves to Priya Sharma
    startDate: '2026-11-05',
    endDate: '2027-04-30',
    totalHours: 450,
    finalCost: null, // Shows "Not estimated"
  },
  {
    id: 'proj-105',
    name: 'Smart Contract Audit Tool',
    client: 'BlockSecure Labs',
    status: 'Review Pending', // Unseen status -> tests fallback badge
    ownerId: 'u5', // Resolves to Vikram Malhotra
    startDate: '2026-09-15',
    endDate: '2026-11-30',
    totalHours: 140,
    finalCost: undefined, // Shows "Not estimated"
  },
  {
    id: 'proj-106',
    name: 'E-Commerce Checkout Revamp',
    client: 'ShopNest Retail',
    status: 'In Progress',
    ownerId: 'u1', // Resolves to Anita Rao
    startDate: '2026-08-20',
    endDate: '2026-10-25',
    totalHours: 260,
    finalCost: 1482950,
  },
];

/**
 * Vite Plugin: Mock API Server
 * Responds to GET /projects and GET /users with simulated network latency (600ms)
 * Allows checking the DevTools Network waterfall, skeletons, and error testing.
 */
function mockApiPlugin() {
  return {
    name: 'mock-api-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');

        if (url.pathname === '/projects') {
          // Check for simulated error parameter
          const simulateError = url.searchParams.get('error') === 'true';
          const empty = url.searchParams.get('empty') === 'true';

          setTimeout(() => {
            if (simulateError) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Server failed to retrieve projects (Simulated 500)' }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(empty ? [] : mockProjects));
          }, 600); // 600ms delay to clearly show skeleton loading
          return;
        }

        if (url.pathname === '/users') {
          setTimeout(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(mockUsers));
          }, 600);
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    mockApiPlugin(),
  ],
})
