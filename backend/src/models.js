// StorageUnit: { name, size, location, pricePerDay, isAvailable }
// Booking: { userName, unitId, startDate, endDate }

const CREATE_UNITS_TABLE = `
CREATE TABLE IF NOT EXISTS storage_units (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  size VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  price_per_day NUMERIC(10,2) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE
);`;

const CREATE_BOOKINGS_TABLE = `
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  unit_id INTEGER REFERENCES storage_units(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);`;

module.exports = {
  CREATE_UNITS_TABLE,
  CREATE_BOOKINGS_TABLE,
};
