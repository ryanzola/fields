# AGENTS.md

## 📦 Project Overview

- This repository contains:
  - A headless WordPress setup (`wordpress/`) with Docker Compose
  - A React + Vite + Tailwind frontend (`client/`) that fetches data via WP REST API
- The Docker Compose stack (`docker-compose.yaml`) includes:
  - `db`: MariaDB (data in named volume `db_data`)
  - `wordpress`: WordPress with uploads persisted to `wordpress_uploads` volume
  - `client`: React dev server on port 5173
- Deployed on a single GCE VM (`e2-micro` or higher) at external IP `34.74.80.145`

---

## ✅ Deployment Workflow

### 1. **Front-end: Build & Deploy React**

```bash
cd client
npm ci
npm run build
gcloud compute scp --recurse ./dist calm-fields-demo:~/calm-fields/client/dist
gcloud compute ssh calm-fields-demo -- \
  "cd ~/calm-fields && docker-compose up -d --no-deps --build client"
```

### 2. **Full Stack (WordPress/DB + React)**

Use this when backend changes:

```bash
gcloud compute scp --recurse . calm-fields-demo:~/calm-fields
gcloud compute ssh calm-fields-demo
docker-compose up -d --build
```

### 🔍 Docker Compose Recommendations

Never use `docker-compose down -v` — this erases DB and uploads

To stop/restart only React:

```bash
docker-compose stop client

docker-compose up -d --no-deps --build client
```

### 🌐 Environment Variables

- React uses VITE_API_BASE_URL, e.g.:

```bash
VITE_API_BASE_URL=http://34.74.80.145/wp-json/wp/v2
```

- WordPress and MariaDB are configured via docker-compose.yaml — no manual changes required unless changing credentials, DB name, or ports.

### 🟢 VM Setup & Maintenance

VM has Docker & Docker Compose installed via startup ≈ sudo apt install docker.io docker-compose

React dev server exposed on port 5173 → ensure firewall rule allow-react-5173

Static external IP (`34.74.80.145`) reserved — docs update this only if changed

Optional: add swap or upgrade to `e2-small` if out-of-memory errors occur

### 🔄 Service Restarts & VM Restarts

If VM is stopped/started:

Run:

```bash
Copy
Edit
cd ~/calm-fields
docker-compose up -d
```

Recommended: add to crontab:

```bash
@reboot cd ~/calm-fields && docker-compose up -d
```

### 📌 Quick Links & Aliases

- `dev client`: `docker-compose up -d --no-deps --build client`
- `dev all`: `docker-compose up -d --build`
- `scp-client`: `gcloud compute scp --recurse ./client calm-fields-demo:~/calm-fields`
- `restart stack`: `ssh calm-fields-demo docker-compose up -d --build`

### 🧪 Testing & Health Checks

React: Verify by visiting `http://34.74.80.145:5173`

WordPress:`http://34.74.80.145/wp-json/wp/v2/posts?_embed`

Running services:

```bash
docker ps
curl http://localhost:5173/health-check
```

Memory monitoring: `free -h`, `docker stats`

### 🧩 Codex Agent Guidance

- Always build React locally before deploy (using `npm run build`)
- Don’t wipe volumes — maintain DB & uploads
- Keep `.gcloudignore` or use `scp` to avoid uploading `node_modules`
- Wrap commands in `docker-compose up -d --no-deps --build client` for frontend updates
- Reflect external IP changes by updating `.env.production`
- Remember to run volume permissions fix:

```bash
docker-compose exec wordpress chown -R www-data:www-data /var/www/html/wp-content/uploads
```

### 🌀 When updating WordPress or DB

- Push changed theme code or PHP → run full `docker-compose up -d --build`
- If modifying database schema or volumes, ensure correct mounts and ownership
