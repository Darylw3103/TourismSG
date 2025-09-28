import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import pool from './db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Attractions API
app.get('/api/attractions', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    //  Get ALL columns
    const [rows] = await connection.execute('SELECT * FROM attractions');
    
    connection.release();
    res.json(rows); // Now returns full objects
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hotels API
app.get('/api/hotels', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Get hotels data 
    const [rows] = await connection.execute('SELECT * FROM hotels');
    
    connection.release();
    res.json(rows);
    
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch hotels from database' });
  }
});

// Concerts API
app.get('/api/concerts', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM concerts');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch concerts from database' });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
