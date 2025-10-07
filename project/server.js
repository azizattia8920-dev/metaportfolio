import express from 'express';
import cors from 'cors';

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

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
