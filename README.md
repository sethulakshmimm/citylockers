# Storage Booking Web App (Dockerized)

## Quick Start with Docker Compose

This project includes everything you need to run the backend (Node.js + Express), frontend (Next.js), and PostgreSQL database using Docker Compose.

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

---

For more details, see the `backend/README.md` and `frontend/README.md`.
