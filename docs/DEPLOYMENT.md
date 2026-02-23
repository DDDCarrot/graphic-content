# Deployment Guide

This application is a static site (SPA) built with Vite + React. It can be deployed to any static hosting service.

## Build Process

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build for Production**:
   ```bash
   npm run build
   ```
   This command compiles TypeScript, bundles assets, and optimizes the application for production.
   The output files will be in the `dist/` directory.

## Deployment Options

### 1. Vercel (Recommended)
- Connect your Git repository to Vercel.
- Select `Vite` as the framework preset.
- Click **Deploy**.

### 2. Netlify
- Drag and drop the `dist/` folder to Netlify Drop.
- Or connect your Git repository and set the build command to `npm run build` and publish directory to `dist`.

### 3. GitHub Pages
- Install `gh-pages` package: `npm install gh-pages --save-dev`.
- Add `"homepage": "https://<username>.github.io/<repo-name>"` to `package.json`.
- Add a script `"deploy": "gh-pages -d dist"` to `package.json`.
- Run `npm run build` and then `npm run deploy`.

### 4. Docker
Use the provided `Dockerfile` (if applicable) or a standard Nginx image to serve the `dist/` directory.

Example Nginx config:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment Variables

Currently, no environment variables are required. If you add backend services later, create a `.env` file based on `.env.example`.
