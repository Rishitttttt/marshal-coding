# Deployment

## Recommended free setup

- Frontend: Vercel
- Backend: Render free web service
- Database: Neon free Postgres

This app needs a long-running Node.js process for Socket.IO, so a fully serverless backend is the wrong deployment target. Render is the simplest free option for this stack.

## Backend

1. Create a Neon Postgres database and copy the connection string.
2. Create a Render web service from this repository using [render.yaml](/C:\Users\KIIT\Downloads\backend\render.yaml).
3. Set these environment variables in Render:
   - `DATABASE_URL`
   - `JWT_ACCESS_SECRET`
   - `JWT_REFRESH_SECRET`
   - `FRONTEND_URL`
   - `CORS_ORIGIN`
4. Run Prisma migrations once after the service is created.
5. Seed the database if you want demo content.

Commands:

```bash
cd Backend
npx prisma migrate deploy
node seed.js
```

## Frontend

1. Deploy the `frontend` directory to Vercel.
2. Set `VITE_BACKEND_URL` to the deployed Render backend URL.
3. Ensure the backend `FRONTEND_URL` and `CORS_ORIGIN` values match the final Vercel origin.

## Local setup

Backend:

```bash
cd Backend
copy .env.example .env
npm install
npx prisma migrate dev
node seed.js
npm run dev
```

Frontend:

```bash
cd frontend
copy .env.example .env
npm install
npm run dev
```
