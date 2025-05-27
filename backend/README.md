# Storage Booking Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up PostgreSQL and update `.env` with your database credentials.
3. Run migrations:
   ```bash
   npm run migrate
   ```
4. (Optional) Seed the database with sample storage units:
   ```bash
   node src/seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `GET /units` — List all storage units
- `POST /book` — Book a unit
- `GET /bookings?userName=...` — List bookings for a user
