import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Store visit count in memory (in production, you'd use a database)
let visitCount = 0;
let visitorLogs = [];

// API endpoint to track visits
app.get('/api/visit', (req, res) => {
  visitCount++;
  const timestamp = new Date().toISOString();
  visitorLogs.push({ count: visitCount, timestamp });

  res.json({
    message: 'Visit tracked successfully',
    totalVisits: visitCount,
    timestamp,
  });
});

// API endpoint to get stats
app.get('/api/stats', (req, res) => {
  res.json({
    totalVisits: visitCount,
    recentVisits: visitorLogs.slice(-10).reverse(),
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Serve static files from the React app
app.use(express.static(join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match API routes, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
