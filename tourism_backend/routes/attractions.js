import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all attractions
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM attractions");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch attractions" });
  }
});

// GET attractions by category and/or region
// Example: /api/attractions/category?region=Orchard&category=Museums & Art Galleries
router.get("/category", async (req, res) => {
  const { region, category } = req.query;

  let query = "SELECT * FROM attractions WHERE 1=1";
  const params = [];

  if (region) {
    query += " AND region LIKE ?";
    params.push(`%${region}%`);
  }
  if (category) {
    query += " AND category LIKE ?";
    params.push(`%${category}%`);
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, params);
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch attractions by category" });
  }
});

export default router;
