import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

/**
 * Mock Backend Data for Day 3 & Day 4:
 * Projects have ownerId which resolves via GET /users.
 */
const mockUsers = [
  { id: 'u1', name: 'Anita Rao', role: 'Engineering Lead' },
  { id: 'u2', name: 'B. Venkat Sreekar', role: 'Full Stack Developer' },
  { id: 'u3', name: 'Priya Sharma', role: 'Product Manager' },
  { id: 'u4', name: 'Rahul Verma', role: 'DevOps Architect' },
  { id: 'u5', name: 'Vikram Malhotra', role: 'QA Lead' },
];

let mockProjects = [
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
    description: 'Migrating on-premise infrastructure to AWS with hybrid-cloud security and auto-scaling.',
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
    description: 'Generative AI bot supporting multi-lingual customer inquiries and ticket escalations.',
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
    description: 'Real-time GPS fleet tracking and telematics dashboard for supply chain logistics.',
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
    description: 'HIPAA-compliant telemedicine platform with video consultations and prescription sync.',
  },
  {
    id: 'proj-105',
    name: 'Smart Contract Audit Tool',
    client: 'BlockSecure Labs',
    status: 'Review Pending',
    ownerId: 'u5', // Resolves to Vikram Malhotra
    startDate: '2026-09-15',
    endDate: '2026-11-30',
    totalHours: 140,
    finalCost: undefined, // Shows "Not estimated"
    description: 'Automated vulnerability scanner for EVM-compatible smart contracts.',
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
    description: 'Optimizing checkout funnel with one-click payments, UPI, and instant fraud checks.',
  },
];

/**
 * Vite Plugin: Mock API Server
 * Handles:
 * - GET /projects (all projects)
 * - POST /projects (create new project)
 * - GET /projects/:projectId (single project by ID or 404)
 * - GET /users (team users)
 */
function mockApiPlugin() {
  return {
    name: 'mock-api-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');

        // GET or POST /projects
        if (url.pathname === '/projects') {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body || '{}');
                const newProject = {
                  id: `proj-${Date.now().toString().slice(-4)}`,
                  name: data.name || 'Untitled Project',
                  client: data.client || 'Internal',
                  status: data.status || 'Planning',
                  ownerId: data.ownerId || 'u1',
                  startDate: data.startDate || new Date().toISOString().split('T')[0],
                  endDate: data.endDate || new Date(Date.now() + 90*86400000).toISOString().split('T')[0],
                  totalHours: Number(data.totalHours) || 0,
                  finalCost: Number(data.finalCost) || 0,
                  description: data.description || 'New project initiated.',
                };
                mockProjects.unshift(newProject);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(newProject));
              } catch {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Invalid JSON payload' }));
              }
            });
            return;
          }

          // GET /projects
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
          }, 300);
          return;
        }

        // GET /projects/:projectId
        const projectMatch = url.pathname.match(/^\/projects\/([^/]+)$/);
        if (projectMatch && req.method === 'GET') {
          const id = decodeURIComponent(projectMatch[1]);
          const found = mockProjects.find(p => p.id === id);

          setTimeout(() => {
            if (!found) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Project not found' }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(found));
          }, 300);
          return;
        }

        // GET /users
        if (url.pathname === '/users') {
          setTimeout(() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(mockUsers));
          }, 300);
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
