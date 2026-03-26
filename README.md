# Marcel Coding

Marcel Coding is a production-deployed full-stack DSA practice platform built around curated pattern-based problem sets and real-time discussion rooms. Users can move through structured topics, track solved problems, save notes, and join a live chat tied to a specific problem while solving it.

Live frontend: `https://marshal-coding-frontend.vercel.app`  
Live backend: `https://marcel-coding-api.onrender.com`

## Highlights

- Curated DSA sheet with 14 topics and 160 problems
- Real-time Socket.IO discussion room for every problem
- JWT authentication with refresh-token cookie flow
- Per-user progress tracking and personal notes
- Production deployment on Vercel, Render, and Neon Postgres

## Why this project is interesting

Most coding-practice tools are either generic trackers or plain problem lists. Marcel Coding is designed around a more useful workflow:

- practice by pattern instead of random browsing
- resume exactly where you left off
- discuss the current problem in real time
- keep your own notes and solved state per question

That makes it both a product project and a systems project: there is user-facing workflow design, persistent state, real-time communication, and full production deployment.

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React, Vite, React Router, Axios, Tailwind CSS, Socket.IO Client |
| Backend | Node.js, Express, Prisma, Socket.IO, JWT, bcrypt |
| Database | PostgreSQL on Neon |
| Deployment | Vercel, Render |

## Features

### Authentication

- User registration and login
- Access-token based API and socket auth
- Refresh token stored in HTTP-only cookie
- Logout with refresh token invalidation

### Pattern-based learning

- Topic-oriented DSA sheet instead of an unbounded problem list
- Topics include Two Pointers, Sliding Window, Prefix Sum, Binary Search, Heap, Trees, and more
- Progress counts at sheet and topic level
- Resume card to continue from the next unsolved problem

### Problem workspace

- Open a dedicated page for each problem
- Save personal notes
- Mark solved / unsolved state
- Open the original problem link directly

### Real-time discussion

- Socket.IO room per problem
- Live message broadcasting
- Presence updates for active users in the room
- Persisted message history in PostgreSQL

## Architecture

```text
React frontend
   |
   |  HTTPS / REST
   v
Express API  --------------------> Prisma --------------------> Neon Postgres
   |
   |  WebSocket / Socket.IO
   v
Problem-specific live rooms
```

## Monorepo structure

```text
.
|-- src/                          # Express server, controllers, routes, auth, sockets
|-- prisma/                       # Prisma schema and migrations
|-- frontend/                     # React + Vite client
|-- import-instagram-patterns.js  # bulk content import script
|-- seed.js                       # starter local seed data
|-- render.yaml                   # Render deployment config
`-- DEPLOYMENT.md                 # deployment notes
```

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

Useful root scripts:

```bash
npm run dev
npm run frontend:dev
npm run frontend:build
npm run frontend:lint
```

## Data import

The repo includes a bulk importer for the curated Instagram-style DSA pattern list:

```bash
node import-instagram-patterns.js
```

This imports the topic and problem dataset into the configured database.

## Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on Neon

See [DEPLOYMENT.md](DEPLOYMENT.md) for the deployment structure used for this project.

## Resume-ready description

Built and deployed a full-stack DSA practice platform with JWT authentication, PostgreSQL/Prisma persistence, per-user progress tracking, notes, and real-time Socket.IO discussion rooms for individual problems. Deployed the frontend on Vercel, backend on Render, and database on Neon.

## Next high-value improvements

- Add screenshots or a short GIF demo to this README
- Add API tests for auth, problem, and progress flows
- Add admin tooling for content import and management
- Improve room presence with usernames and typing indicators
- Add paginated message history UI
