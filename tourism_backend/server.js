import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON request body

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

