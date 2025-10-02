import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {   // <--- changed to "/"
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM concerts");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch concerts from database" });
  }
});

export default router;
