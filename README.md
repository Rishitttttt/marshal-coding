# Marcel Coding

Marcel Coding is a full-stack DSA practice platform built around curated pattern-based problem sets and real-time discussion rooms. Instead of an endless problem list, the app organizes questions by topic, tracks per-user progress, and lets users discuss a specific problem live while solving it.

Live app: `https://marshal-coding-frontend.vercel.app`  
Backend API: `https://marcel-coding-api.onrender.com`

## Why this project stands out

- Pattern-based learning flow instead of an unstructured question dump
- Real-time Socket.IO discussion room for each problem
- JWT access-token auth with refresh-token cookie flow
- Per-user progress tracking and notes persistence
- Production deployment across Vercel, Render, and Neon Postgres

## Tech stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS, Socket.IO Client
- Backend: Node.js, Express, Prisma, Socket.IO, JWT, bcrypt
- Database: PostgreSQL on Neon
- Deployment: Vercel for frontend, Render for backend

## Monorepo structure

```text
.
|-- src/                  # Express API, auth, sockets, controllers, routes
|-- prisma/               # Prisma schema and migrations
|-- frontend/             # React + Vite client
|-- seed.js               # starter local data
|-- import-instagram-patterns.js
|-- render.yaml
`-- DEPLOYMENT.md
```

## Core features

### Authentication

- Register and login flow
- JWT access token for API and socket auth
- Refresh token stored in HTTP-only cookie
- Logout support with refresh token invalidation

### Curated DSA sheets

- One main pattern sheet with topics like Two Pointers, Sliding Window, Binary Search, Heap, Trees, and more
- 160 imported problems organized into 14 topics
- Per-topic and per-sheet progress tracking

### Problem workspace

- Open any problem to view notes and discussion
- Save personal notes per problem
- Mark problems solved and resume from the next unsolved problem

### Real-time discussion

- One Socket.IO room per problem
- Live message delivery
- Online presence updates for problem rooms

## Production setup

### Frontend

- Hosted on Vercel
- Uses `VITE_BACKEND_URL` to target the deployed API

### Backend

- Hosted on Render
- Uses Prisma with Neon PostgreSQL
- Configured for production CORS and cross-site auth cookies

## Local development

### Backend

```bash
npm install
copy .env.example .env
npx prisma migrate dev
node seed.js
npm run dev
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Data import

The repository includes an importer for the Instagram-style DSA pattern list:

```bash
node import-instagram-patterns.js
```

This loads the production-style pattern sheet into the current database using the configured `DATABASE_URL`.

## Resume-ready project summary

Built and deployed a full-stack DSA practice platform with JWT authentication, PostgreSQL/Prisma persistence, per-user progress tracking, notes, and real-time Socket.IO discussion rooms for individual problems. Deployed the frontend on Vercel, backend on Render, and database on Neon.

## Improvement ideas

- Add screenshots and a short demo GIF to this README
- Add API tests for auth, progress, and problem flows
- Add admin tooling for question import and content management
- Add message pagination UI and richer room presence
