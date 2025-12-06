import express from 'express';
import cors from 'cors';
import setupRoutes from './routes/routes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get('/health', (req, res) => res.send('ok'));

setupRoutes(app);

export default app;
