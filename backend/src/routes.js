const express = require('express');
const pool = require('./db');

const router = express.Router();

// GET /units — List all units (optionally filter by location/size)
router.get('/units', async (req, res) => {
  try {
    const { location, size } = req.query;
    let query = 'SELECT * FROM storage_units';
    const params = [];
    if (location || size) {
      query += ' WHERE';
      if (location) {
        params.push(location);
        query += ` location = $${params.length}`;
      }
      if (size) {
        if (params.length > 0) query += ' AND';
        params.push(size);
        query += ` size = $${params.length}`;
      }
    }
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /book — Book a unit (with conflict check)
router.post('/book', async (req, res) => {
  try {
    const { userName, unitId, startDate, endDate } = req.body;
    // Check for booking conflicts
    const conflictQuery = `SELECT * FROM bookings WHERE unit_id = $1 AND NOT (end_date < $2 OR start_date > $3)`;
    const { rows: conflicts } = await pool.query(conflictQuery, [unitId, startDate, endDate]);
    if (conflicts.length > 0) {
      return res.status(409).json({ error: 'Storage unit is already booked for these dates.' });
    }
    // Create booking
    await pool.query(
      'INSERT INTO bookings (user_name, unit_id, start_date, end_date) VALUES ($1, $2, $3, $4)',
      [userName, unitId, startDate, endDate]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /bookings — List bookings for a user (query param: userName)
router.get('/bookings', async (req, res) => {
  try {
    const { userName } = req.query;
    if (!userName) return res.status(400).json({ error: 'userName is required' });
    const { rows } = await pool.query(
      `SELECT b.*, s.name AS unit_name, s.location, s.size, s.price_per_day FROM bookings b JOIN storage_units s ON b.unit_id = s.id WHERE b.user_name = $1 ORDER BY b.start_date DESC`,
      [userName]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
