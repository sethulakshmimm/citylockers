// Script to seed initial storage units
defaultUnits = [
  { name: 'Locker A', size: 'Small', location: 'Downtown', price_per_day: 10.00 },
  { name: 'Locker B', size: 'Medium', location: 'Downtown', price_per_day: 15.00 },
  { name: 'Locker C', size: 'Large', location: 'Suburbs', price_per_day: 20.00 },
  { name: 'Locker D', size: 'Medium', location: 'Suburbs', price_per_day: 16.00 },
  { name: 'Locker E', size: 'Small', location: 'Airport', price_per_day: 12.00 }
];

const pool = require('./db');

async function seed() {
  for (const unit of defaultUnits) {
    await pool.query(
      `INSERT INTO storage_units (name, size, location, price_per_day, is_available)
       VALUES ($1, $2, $3, $4, true)
       ON CONFLICT (name) DO NOTHING`,
      [unit.name, unit.size, unit.location, unit.price_per_day]
    );
  }
  console.log('Seeded storage units.');
  await pool.end();
}

if (require.main === module) {
  seed().catch(e => { console.error(e); process.exit(1); });
}
