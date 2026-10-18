# Docker Implementation Guide — Sayso Project

This guide translates all instructions and troubleshooting scenarios from the practice sheets directly to the **Sayso** repository (MERN stack: React frontend, Express backend, and MongoDB database).

---

## 1. Architecture Overview

| Component | Technology | Container Name | Port Mapping | Service Name in Compose |
|---|---|---|---|---|
| **Backend API** | Node.js (Express, Mongoose) | `sayso-backend` | `3000:3000` | `backend` (alias: `app`) |
| **Frontend UI** | React + Vite | `sayso-frontend` | `5173:5173` | `frontend` |
| **Database** | MongoDB 6 | `sayso-mongo` | `27017:27017` | `db` |
| **Storage** | Named Docker Volume | `sayso_mongo-data` | `/data/db` | `mongo-data` |

---

## 2. Docker Files Implemented

1. **[backend/Dockerfile](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/backend/Dockerfile)**:
   - Uses `FROM node:20-alpine` (pinned version matching CI and runtime).
   - Optimizes layer caching by copying `package*.json` and running `npm install` before `COPY . .`.
   - Exposes port `3000` and starts with `CMD ["npm", "start"]`.
2. **[backend/.dockerignore](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/backend/.dockerignore)**:
   - Excludes `node_modules`, `.git`, `.env`, and debug logs to keep image size small (~245MB instead of 1.2GB).
3. **[frontend/Dockerfile](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/frontend/Dockerfile)**:
   - Builds Vite production bundle with `npm run build`.
   - Serves the build with `npm run preview -- --host 0.0.0.0 --port 5173`.
4. **[frontend/.dockerignore](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/frontend/.dockerignore)**:
   - Excludes `node_modules`, `.git`, `.env`, and `dist`.
5. **[docker-compose.yml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/docker-compose.yml)**:
   - Orchestrates `backend`, `frontend`, and `db`.
   - Injects `MONGO_URL=mongodb://db:27017/sayso` and `MONGO_URI=mongodb://db:27017/sayso`.
   - Mounts named volume `mongo-data:/data/db` for persistent storage.
6. **[Makefile](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/Makefile)**:
   - `make docker-build`: builds both `sayso-backend` and `sayso-frontend`.
   - `make docker-up`: runs `docker compose up --build`.
   - `make docker-down`: stops and cleans containers.
7. **[.github/workflows/ci.yml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/.github/workflows/ci.yml)** and **[.github/workflows/docker-ci.yml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/.github/workflows/docker-ci.yml)**:
   - CI pipeline that builds images on every push, runs tests *inside* the container (`docker run --rm sayso-backend npm test`), tags with commit SHA, and pushes to GitHub Container Registry (`ghcr.io`).

---

## 3. Practice Steps (Mapped to Sayso)

### Step 5: Build the Images
```bash
# Build backend
docker build -t sayso-backend ./backend

# Build frontend
docker build -t sayso-frontend ./frontend

# List images
docker images
```

### Step 6: Run Alone (And Let It Fail On Purpose)
```bash
docker run -p 3000:3000 --name sayso-solo sayso-backend
```
- **Result**: Fails with `MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017`.
- **Reason**: The container is isolated; `localhost` refers to inside the container, not your host machine or another container.
- **Clean up**:
  ```bash
  docker rm sayso-solo
  ```

### Step 7: Everyday Commands
```bash
# Run in background
docker run -d -p 3000:3000 --name sayso-solo sayso-backend

# View active containers
docker ps

# View all containers (including stopped)
docker ps -a

# View console logs
docker logs sayso-solo
docker logs -f sayso-solo

# Open interactive shell inside the container
docker exec -it sayso-solo sh

# Stop, remove container, and remove image
docker stop sayso-solo
docker rm sayso-solo
docker rmi sayso-backend
```

### Step 8: Inspection Commands
```bash
# Live CPU & memory usage
docker stats

# Processes inside the container
docker top sayso-solo

# Full JSON metadata
docker inspect sayso-solo

# Extract container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sayso-backend

# Port mappings
docker port sayso-backend

# Copy files in and out
docker cp sayso-backend:/app/package.json ./copied-package.json
echo "hello from host" > note.txt
docker cp note.txt sayso-backend:/app/note.txt
docker exec -it sayso-backend sh -c "cat /app/note.txt"

# Inspect filesystem changes
docker diff sayso-backend

# History of image layers
docker history sayso-backend

# Network and Volume inspection
docker network ls
docker network inspect sayso_default
docker volume ls
docker volume inspect sayso_mongo-data

# Disk usage breakdown
docker system df

# Clean up unused Docker resources
docker system prune
```

### Step 9: Docker Compose (App + Database Together)
```bash
# Start all services in the background
docker compose up -d

# Check service status
docker compose ps

# Check logs
docker compose logs -f backend

# Verify health endpoint
curl http://localhost:3000/health
# Returns: {"status":"ok","commitSha":"local"}

# Stop services without deleting database volume (data persists)
docker compose down

# Stop and wipe database volume completely
docker compose down -v
```

### Step 10: Pushing to GitHub Container Registry (GHCR)
```bash
# 1. Log in with your GitHub Personal Access Token (classic with write:packages)
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# 2. Tag backend and frontend images
docker tag sayso-backend ghcr.io/YOUR_GITHUB_USERNAME/sayso-backend:latest
docker tag sayso-frontend ghcr.io/YOUR_GITHUB_USERNAME/sayso-frontend:latest

# 3. Push to GHCR
docker push ghcr.io/YOUR_GITHUB_USERNAME/sayso-backend:latest
docker push ghcr.io/YOUR_GITHUB_USERNAME/sayso-frontend:latest
```

---

## 4. Key Troubleshooting Scenarios (PDF Part 2)

| Scenario | Symptom / Problem | Root Cause | Solution |
|---|---|---|---|
| **1. Unreachable in browser** | Container runs but browser times out | Forgot `-p hostport:containerport` | Run with `-p 3000:3000` (backend) or `-p 5173:5173` (frontend) |
| **2. Image is 1.2 GB instead of ~200MB** | Image is bloated | Missing `.dockerignore`, `node_modules` copied into image | Add `.dockerignore` excluding `node_modules` |
| **3. Code changes not showing** | Edited code, rebuilt image, old code still answers | Old container is still running from old image | Run `docker stop <container> && docker rm <container>` before running new image |
| **4. Build takes 40s on single-line edit** | Layer cache invalidated on every file edit | `COPY . .` was placed before `RUN npm install` | Copy `package*.json` first, run `npm install`, then `COPY . .` |
| **5. Standalone container can't reach DB** | `ECONNREFUSED 127.0.0.1:27017` | Isolated network namespace; `localhost` is internal | Use `docker compose` or put containers on a shared Docker bridge network |
| **6. Manual run fails, compose works** | Compose resolves `db`, manual run doesn't | Compose creates private DNS network where service name `db` resolves to IP | Run via compose or attach manual container to project network with `--network` |
| **7. "Port is already allocated"** | `Bind for 0.0.0.0:3000 failed` | Old container or local Node process is still holding the port | Run `docker ps` to find container, then `docker stop` & `docker rm` |
| **8. Hardcoded Mongo URL** | Hardcoding `localhost:27017` breaks in compose | Inside container, localhost has no Mongo | Use `process.env.MONGO_URI \|\| process.env.MONGO_URL` to point to `db` |
| **9 & 10. Data lost after restart** | Database reset on container deletion | Missing named volume | Use `volumes: - mongo-data:/data/db` in `docker-compose.yml` |
| **11. Push fails with "unauthorized"** | `User cannot be authenticated` | Expired PAT token or username misspelled in image tag | Regenerate PAT with `write:packages` and check tag format `ghcr.io/username/repo:tag` |
| **12. Breaks for evaluator** | Works on your laptop, fails in CI or evaluator | Using `FROM node:latest` which changed versions | Pin to specific version `FROM node:20-alpine` |
