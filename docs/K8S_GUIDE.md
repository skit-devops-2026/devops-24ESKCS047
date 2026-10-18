# Kubernetes Implementation Guide — Sayso Project

This guide translates all instructions, architecture concepts, and orchestration workflows from the **Kubernetes Beginner Practice Sheet** directly to the **Sayso** repository (MERN stack: React frontend, Express backend, and MongoDB database).

---

## 1. Kubernetes Architecture & Concepts

| Concept | What It Does in Sayso |
|---|---|
| **Cluster** | The group of machines (or local `kind` Docker node) running the containers together. |
| **Node** | The machine hosting the container runtime (`containerd`), `kubelet`, and `kube-proxy`. |
| **Pod** | Smallest schedulable unit wrapping the application container (`backend`, `frontend`, or `mongo`). |
| **Deployment** | Declares desired state (e.g. `replicas: 2`), manages auto-restart (self-healing), scaling, and rolling updates. |
| **Service** | Stable DNS and network endpoint that load balances traffic across ephemeral Pods (e.g. `mongo-service`, `backend-service`). |

---

## 2. Kubernetes Manifests Implemented

All manifests reside in the `k8s/` directory:

1. **[k8s/mongo-deployment.yaml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/k8s/mongo-deployment.yaml)**:
   - Runs 1 replica of `mongo:6`.
   - Listens on `containerPort: 27017`.
2. **[k8s/mongo-service.yaml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/k8s/mongo-service.yaml)**:
   - Internal `ClusterIP` Service exposing port `27017`.
   - Allows backend Pods to resolve `mongodb://mongo-service:27017/sayso` without exposing the database to the internet.
3. **[k8s/backend-deployment.yaml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/k8s/backend-deployment.yaml)**:
   - Runs 2 replicas of `ghcr.io/anjali-kanwar/social-media-backend:latest`.
   - Injects `MONGO_URL=mongodb://mongo-service:27017/sayso`.
   - Exposes `containerPort: 3000`.
4. **[k8s/backend-service.yaml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/k8s/backend-service.yaml)**:
   - Exposes backend API externally using `type: NodePort` on port `3000` (NodePort `30080`).
5. **[k8s/frontend-deployment.yaml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/k8s/frontend-deployment.yaml)**:
   - Runs 2 replicas of `ghcr.io/anjali-kanwar/social-media-frontend:latest`.
   - Exposes `containerPort: 5173`.
6. **[k8s/frontend-service.yaml](file:///c:/Users/DELL/OneDrive/Desktop/Git%20Project/Sayso/k8s/frontend-service.yaml)**:
   - Exposes frontend UI externally using `type: NodePort` on port `5173` (NodePort `30081`).

---

## 3. Step-by-Step Practice Commands

### Step 1: Create a Local Practice Cluster
```bash
# If using kind (Kubernetes in Docker)
kind create cluster --name sayso-cluster

# Check cluster status and nodes
kubectl cluster-info
kubectl get nodes
```

### Step 2: Bare Pod vs. Deployment (Section 3 vs. 4)
```bash
# Run bare Pod (no self-healing)
kubectl run sayso-backend-test --image=ghcr.io/anjali-kanwar/social-media-backend:latest --port=3000

# Inspect pod
kubectl get pods
kubectl describe pod sayso-backend-test
kubectl logs sayso-backend-test
kubectl exec -it sayso-backend-test -- sh

# Delete bare pod (notice: it disappears permanently)
kubectl delete pod sayso-backend-test
```

### Step 3: Deploy All Workloads Declaratively (Section 4)
```bash
# Apply all manifests in k8s folder
kubectl apply -f k8s/

# Or via Makefile
make k8s-apply

# Verify deployments, pods, and services
kubectl get deployments
kubectl get pods
kubectl get svc
```

### Step 4: Access Services Locally
```bash
# Port forward backend to localhost:3000
kubectl port-forward svc/backend-service 3000:3000

# Port forward frontend to localhost:5173
kubectl port-forward svc/frontend-service 5173:5173

# Test health check in another terminal
curl http://localhost:3000/health
# Returns: {"status":"ok","commitSha":"local"}
```

---

## 4. Watching Orchestration in Action (Section 5)

Keep `kubectl get pods -w` running in one terminal while testing the following:

### 1. Self-Healing
Delete one of the active backend pods:
```bash
kubectl delete pod <one-of-the-backend-pod-names>
```
- **Observation**: A replacement Pod appears instantly. The Kubernetes controller manager detects that only 1 replica is running when the desired state is 2, and launches a replacement immediately.

### 2. Horizontal Scaling
Scale backend replicas from 2 to 4 without code changes or downtime:
```bash
kubectl scale deployment backend-deployment --replicas=4
kubectl get pods
```
- The `backend-service` immediately load balances traffic across all 4 pods.

### 3. Zero-Downtime Rolling Update & Rollback
Deploy a new image version smoothly:
```bash
# Update container image
kubectl set image deployment/backend-deployment backend=ghcr.io/anjali-kanwar/social-media-backend:v2

# Watch the rolling update happen Pod by Pod
kubectl rollout status deployment/backend-deployment

# View rollout history
kubectl rollout history deployment/backend-deployment

# Roll back instantly to the previous version
kubectl rollout undo deployment/backend-deployment
```

---

## 5. Troubleshooting & Useful Commands (Section 6 & 8)

| Command | Purpose |
|---|---|
| `kubectl get all` | Overview of all pods, services, and deployments in the cluster. |
| `kubectl describe pod <name>` | Detailed events and reason why a Pod failed to schedule or start. |
| `kubectl logs <name>` | Standard output console logs of the running container. |
| `kubectl logs <name> --previous` | Inspect logs of a container that crashed right before it was restarted (`CrashLoopBackOff`). |
| `kubectl exec -it <name> -- sh` | Open an interactive shell inside a running pod. |
| `kubectl delete -f k8s/` | Clean up all deployed resources in one command (`make k8s-delete`). |
