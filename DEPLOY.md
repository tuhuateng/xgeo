# Deployment Guide: React (Node.js) + FastAPI (Python)

This guide explains how to deploy your hybrid application to a production server (e.g., Aliyun ECS, AWS EC2, or a private server).

## Architecture Overview
- **Frontend**: React App (Vite). In production, this is compiled to static HTML/JS/CSS files.
- **Backend**: FastAPI (Python). Runs as a persistent service (using Uvicorn).
- **Web Server**: Nginx. Acts as a reverse proxy to serve the frontend files and forward API requests to the backend.

## Prerequisites
- A Linux server (Ubuntu/CentOS).
- Node.js & npm installed.
- Python 3.10+ & pip installed.
- PostgreSQL installed (or use an external DB service).
- Nginx installed.

## Step 1: Backend Deployment (Python)

1.  **Clone Code**: Upload your project to the server.
2.  **Setup Virtual Environment**:
    ```bash
    cd /path/to/project
    python3 -m venv venv
    source venv/bin/activate
    pip install -r backend/requirements.txt
    ```
3.  **Environment Variables**:
    Create a `.env` file in the root directory with your production keys:
    ```env
    DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
    DEEPSEEK_API_KEY="sk-..."
    DOUBAO_API_KEY="sk-..."
    SECRET_KEY="prod_secret_key"
    ```
4.  **Run with PM2 or Systemd**:
    It's best to use a process manager like `gunicorn` or `pm2` to keep the backend running.
    *Using Gunicorn (Recommended for Prod):*
    ```bash
    pip install gunicorn
    gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app --bind 0.0.0.0:8000 --daemon
    ```

## Step 2: Frontend Deployment (Node.js/Static)

1.  **Build the Frontend**:
    On your local machine or the server:
    ```bash
    npm install
    npm run build
    ```
    This creates a `dist/` directory containing the optimized static files.

2.  **Deploy Static Files**:
    Move the contents of `dist/` to a web directory, e.g., `/var/www/xgeo/dist`.

## Step 3: Nginx Configuration (The Glue)

Configure Nginx to serve the static frontend and proxy API requests to the Python backend.

Create a config file `/etc/nginx/sites-available/xgeo`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/xgeo/dist;
    index index.html;

    # Serve Frontend (SPA Support)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to FastAPI
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable the site and restart Nginx:
```bash
ln -s /etc/nginx/sites-available/xgeo /etc/nginx/sites-enabled/
systemctl restart nginx
```

## Summary
- Users visit `your-domain.com` -> Nginx serves `index.html` (React).
- React App makes requests to `/api/...` -> Nginx forwards to `localhost:8000` (FastAPI).
- FastAPI talks to PostgreSQL and AI APIs.
