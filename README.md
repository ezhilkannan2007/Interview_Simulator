# AI Interview Simulator Backend

Structured Node.js/Express API that powers the `ai-interview-simulator` experience.

## Structure

- `src/app.js` – Configures middleware and mounts feature routes.
- `src/server.js` – Boots the HTTP server on port 5000 (default).
- `src/routes/` – Groups Express routers by resource (`testRoutes` included).
- `src/controllers/` – Keeps response logic separate from routing.

## Getting Started

```bash
cd backend
npm install
npm run dev  # nodemon for local iterations
npm start     # production-ready start
```

The `/api/test` endpoint returns a quick "Server working" payload to verify connectivity.
