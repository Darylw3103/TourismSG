<<<<<<< Updated upstream
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import cors from 'cors';
=======
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import attractionRoutes from "./routes/attractions.js";
import hotelRoutes from "./routes/hotels.js";
import concertRoutes from "./routes/concerts.js";
import chatRoutes from "./routes/chat.js"; 
>>>>>>> Stashed changes

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON request body

// Routes
<<<<<<< Updated upstream
app.use('/api/auth', authRoutes);
=======
app.use("/api/auth", authRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/concerts", concertRoutes);
app.use("/api/chat", chatRoutes); 
>>>>>>> Stashed changes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

