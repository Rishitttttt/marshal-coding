# Marshal Coding – Real-Time Coding Discussion Backend

Marshal Coding is a backend system for a **real-time collaborative coding discussion platform**.  
The goal is to make coding practice **less isolating** by allowing users to discuss **specific problems in real time** while solving them.

This project is **not a LeetCode clone** — there is **no code execution, judging, or leaderboards**.  
The core focus is **curated practice + scoped real-time discussions**.

---

## 🚀 Why This Project?

While solving coding problems on platforms like LeetCode or GFG, practice often becomes:
- Isolated
- Random (no structured progression)
- Boring over time

Marshal Coding addresses this by:
- Providing **limited, curated sheets** (revision, beginner, pattern-based)
- Attaching a **real-time discussion room to each problem**
- Allowing users solving the *same problem* to interact instantly

---

## 🧠 Core Concept

- Problems are grouped into **Sheets** (e.g. Sliding Window, DSA Revision)
- Every **Problem** has its own **real-time chat room**
- Users join a problem → they join that problem’s room
- Messages are:
  - Delivered in real time using **Socket.IO**
  - Persisted in **PostgreSQL** using **Prisma**

---

## ✨ Features

### Authentication
- User registration & login
- JWT **Access Token** (short-lived)
- JWT **Refresh Token** (long-lived)
- Refresh tokens stored in DB
- Refresh tokens sent via **HTTP-only cookies**
- Secure logout by invalidating refresh token

### Sheets & Problems
- Curated sheets (not infinite lists)
- Each problem belongs to exactly one sheet
- Problems define the context for discussions

### Real-Time Discussion (Core Feature)
- One Socket.IO room per problem
- Users can:
  - Join a problem room
  - Send messages
  - Receive messages instantly
- Messages are saved to the database

### Message History
- REST API to fetch messages by problem
- Supports pagination using cursor-based approach

---

## 🏗️ High-Level System Design

Client
|
|-- REST (Auth, Sheets, Problems, Messages)
|
|-- Socket.IO (Join Problem, Send Message)
|
Server (Node.js + Express)
|
|-- Prisma ORM
|-- PostgreSQL
|
Socket.IO Rooms (problemId based)


---

## 🛠️ Tech Stack & Justification

| Technology | Reason |
|----------|--------|
| Node.js | Event-driven, ideal for real-time systems |
| Express.js | Simple, unopinionated REST API layer |
| PostgreSQL | Strong relational consistency |
| Prisma ORM | Type-safe DB access & schema management |
| Socket.IO | Reliable real-time communication |
| JWT | Stateless authentication |
| bcrypt | Secure password hashing |

---

## 🔐 Authentication Flow (Access + Refresh)

1. User logs in
2. Server issues:
   - Access Token (returned in response)
   - Refresh Token (stored in DB + HTTP-only cookie)
3. Client uses Access Token for API requests
4. When Access Token expires:
   - Client calls refresh endpoint
   - New Access Token is issued if Refresh Token is valid
5. Logout invalidates Refresh Token in DB

---

## 🔌 Real-Time Flow (Socket.IO)

1. Client connects with Access Token
2. User opens a problem
3. Socket joins room: `problemId`
4. Messages:
   - Emitted to the room
   - Persisted to database
5. All connected users receive the message instantly

---

## 🗄️ Database Models (Prisma)

- **User**
- **Sheet**
- **Problem**
- **Message**

Relationships:
- Sheet → Problems (1:N)
- Problem → Messages (1:N)
- User → Messages (1:N)

---

## ⚙️ How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/Rishitttttt/marshal-coding.git
cd marshal-coding
2. Install dependencies
npm install
3. Setup environment variables
Create a .env file:

DATABASE_URL=postgresql://username:password@localhost:5432/db_name
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
4. Run database migrations
npx prisma migrate dev
5. Start the server
npm run dev
Server runs on:

http://localhost:5000
🔮 Future Enhancements
Redis-based presence tracking (online users per problem)

Horizontal scaling for Socket.IO

Minimal frontend (React) for real-time chat UI

Role-based moderation in discussions

📌 Note
This project focuses on backend system design, real-time architecture, and clean data modeling rather than UI or competitive programming features.

👤 Author
Rishit
Backend-focused project built for learning scalable systems and real-time communication.