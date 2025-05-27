![my bookings](https://github.com/user-attachments/assets/962d70d0-c09a-439b-8af1-06b0cb87d5a3)
![Capture](https://github.com/user-attachments/assets/842358aa-f8d8-4dc6-907b-dd617bf1e842)
![book now](https://github.com/user-attachments/assets/8a9a5247-496a-4025-863c-c5da002643fc)
![image](https://github.com/user-attachments/assets/f35f1252-48ad-4d6b-bf21-6f7775741e2c)
# Storage Booking Web App

This project contains both the backend (Node.js + Express) and frontend (Next.js) for a storage booking system, as well as Docker support for easy local setup.

---

## Backend (`backend/README.md`)

### Storage Booking Backend

#### Setup

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

#### API Endpoints
- `GET /units` — List all storage units
- `POST /book` — Book a unit
- `GET /bookings?userName=...` — List bookings for a user

---

## Frontend (`frontend/README.md`)

### Storage Booking Frontend

This is the React (Next.js) frontend for the Storage Booking Web App.

#### Prerequisites
- Node.js & npm
- The backend API running at http://localhost:4000 (see backend/README.md)

#### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure API proxy (for local dev):
   Create or edit `next.config.ts` and add:
   ```ts
   // next.config.ts
   const nextConfig = {
     async rewrites() {
       return [
         {
           source: '/api/:path*',
           destination: 'http://localhost:4000/api/:path*',
         },
       ];
     },
   };
   export default nextConfig;
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Pages
- `/units` — View available storage units
- `/book` — Book a unit
- `/bookings` — View your bookings

---

## Optional: Docker Setup

You can run the entire stack (frontend, backend, and PostgreSQL) using Docker Compose for a seamless local development experience.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed

### How to Run

1. In the project root, start all services:
   ```bash
   docker-compose up --build
   ```
2. Access the app:
   - Frontend: [http://localhost:3000/units](http://localhost:3000/units)
   - Backend API: [http://localhost:4000/api/units](http://localhost:4000/api/units)
   - PostgreSQL: localhost:5432 (user: postgres, password: password, db: storage_booking)

### Stopping Services
```bash
docker-compose down
```

### Notes
- On first run, the backend will auto-connect to the database. You may need to run migrations or seed data if required.
- You can develop locally with hot-reloading: changes to backend/frontend code update containers automatically.
