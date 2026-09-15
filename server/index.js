import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db/database.js';

// Route imports
import authRoutes from './routes/auth.js';
import coursesRoutes from './routes/courses.js';
import skillsRoutes from './routes/skills.js';
import quizRoutes from './routes/quiz.js';
import aiRoutes from './routes/ai.js';
import managerRoutes from './routes/manager.js';
import notificationsRoutes from './routes/notifications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.url.startsWith('/api/health')) {
      console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  return res.json({
    status: 'healthy',
    platform: 'GovLearn AI Backend (SIH26101)',
    version: '2.4.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    features: {
      auth: 'ready',
      courses: 'ready',
      skills: 'ready',
      quiz: 'ready',
      aiCopilot: 'ready',
      manager: 'ready',
      notifications: 'ready',
    },
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/notifications', notificationsRoutes);

// 404 handler for undefined API routes
app.use('/api', (req, res) => {
  return res.status(404).json({
    success: false,
    error: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  return res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server after database initialization
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 GovLearn AI API Server running on port ${PORT}`);
      console.log(`   Health Check: http://localhost:${PORT}/api/health`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`=======================================================`);
    });
  } catch (err) {
    console.error('Failed to start GovLearn AI Server:', err);
    process.exit(1);
  }
}

startServer();
