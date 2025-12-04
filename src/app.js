import express from 'express';
import setupRoutes from './routes/routes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

// health
app.get('/health', (req, res) => res.send('ok'));

// auth
app.use('/api/auth', authRoutes);

setupRoutes(app);

export default app;
