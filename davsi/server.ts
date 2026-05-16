import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { jwt } from 'hono/jwt';
import { cors } from 'hono/cors';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Mock Data for the 4 pillars
let somaBlocks = Array.from({ length: 12 }, (_, i) => ({
  index: i,
  timestamp: Date.now() - (12 - i) * 60000,
  hash: Math.random().toString(36).substring(2),
  prevHash: Math.random().toString(36).substring(2),
  data: `Block ${i} verified`
}));

let daemonLogs = [
  { timestamp: new Date().toISOString(), message: "System initialized. Starting inner monologue..." },
  { timestamp: new Date().toISOString(), message: "Checking SOMA integrity... OK." }
];

let bridgeStatus = {
  online: false,
  device: "Pixel 6a",
  accessibility: "ON",
  termux: "REACHABLE",
  lastHeartbeat: null as string | null
};

// API Routes
app.get('/api/health', (c) => c.json({ status: 'online', provider: 'Emergent Universal' }));

app.get('/api/soma/verify', (c) => c.json({ status: 'OK', blocks: somaBlocks }));

app.post('/api/iris/route', async (c) => {
  const { profile, prompt } = await c.req.json();
  return c.json({
    profile,
    response: `Claude [${profile}]: Verified response to "${prompt}"`,
    latency: "591ms"
  });
});

app.get('/api/daemon/tick', (c) => {
  const log = { timestamp: new Date().toISOString(), message: "DAEMON tick: Analyzing state..." };
  daemonLogs.push(log);
  return c.json(log);
});

app.get('/api/self/propose', (c) => {
  const diff = `--- a/davsi/daemon.ts\n+++ b/davsi/daemon.ts\n@@ -10,1 +10,1 @@\n- console.log("tick");\n+ console.log("monologue tick");`;
  return c.json({ file: 'davsi/daemon.ts', diff });
});

app.post('/api/bridge/heartbeat', async (c) => {
  bridgeStatus.online = true;
  bridgeStatus.lastHeartbeat = new Date().toISOString();
  return c.json({ status: 'received', bridge: bridgeStatus });
});

app.get('/api/bridge/status', (c) => c.json(bridgeStatus));

// Static files for dashboard
app.use('/*', serveStatic({ root: './davsi/web' }));

console.log('DAVSI Cortex running on port 8001');
export default {
  port: 8001,
  fetch: app.fetch,
};
