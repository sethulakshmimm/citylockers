// Simple migration script to create tables
const pool = require('./db');
const { CREATE_UNITS_TABLE, CREATE_BOOKINGS_TABLE } = require('./models');

async function migrate() {
  try {
    await pool.query(CREATE_UNITS_TABLE);
    await pool.query(CREATE_BOOKINGS_TABLE);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  migrate();
}
