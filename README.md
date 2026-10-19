# Sayso

> Replace every angle-bracket placeholder below. The hygiene check in CI will
> fail until you do.

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS047 | Anjali Kanwar | anjali-kanwar |

## About

Sayso is an opinion-sharing and community discussion platform where users can publish, discover, and debate perspectives on various social, political, and educational topics.

## Tech stack

- Frontend: React
- Backend: Node.js / Express
- Database: MongoDB Atlas

## Running locally

```bash
make install
make run
```

### Running with Docker

```bash
make docker-build
make docker-up
# Or directly:
docker compose up --build
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

### Running with Kubernetes

```bash
make k8s-apply
# Or directly:
kubectl apply -f k8s/
```

## Live URL

https://anjali-kanwar.github.io/Social-Media/

- Production URL: https://anjali-kanwar.github.io/Social-Media/
- Live Health Endpoint: https://anjali-kanwar.github.io/Social-Media/health
- Live Health JSON: https://anjali-kanwar.github.io/Social-Media/health.json
- Live Metrics: https://anjali-kanwar.github.io/Social-Media/metrics

## Health endpoint

`GET /health` returns the running commit SHA. See `Makefile` and the milestone
sheet for why this is required.