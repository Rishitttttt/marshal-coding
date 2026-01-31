import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import prisma from "./config/db.js";
import { verifyAccessToken } from "./utils/verifyAccessToken.js";

const PORT = process.env.PORT || 5000;

/* -------------------- HTTP SERVER -------------------- */
const httpServer = http.createServer(app);

/* -------------------- SOCKET.IO -------------------- */
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

/* -------------------- SOCKET AUTH -------------------- */
io.use((socket, next) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers?.authorization?.split(" ")[1];

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return next(new Error("Unauthorized"));
  }

  socket.user = decoded; // { userId, ... }
  next();
});

/* -------------------- PRESENCE STORE (V1) -------------------- */
// Map<problemId, Set<userId>>
const problemPresence = new Map();

/* -------------------- SOCKET EVENTS -------------------- */
io.on("connection", (socket) => {
  const userId = socket.user.userId;
  console.log("🟢 Connected:", userId);

  /* JOIN PROBLEM */
  socket.on("join_problem", ({ problemId }) => {
    const roomName = `problem:${problemId}`;

    socket.join(roomName);

    if (!problemPresence.has(problemId)) {
      problemPresence.set(problemId, new Set());
    }

    problemPresence.get(problemId).add(userId);

    io.to(roomName).emit("presence_update", {
      problemId,
      users: Array.from(problemPresence.get(problemId)),
    });

    console.log(`🟢 User ${userId} joined ${roomName}`);
  });

  /* LEAVE PROBLEM */
  socket.on("leave_problem", ({ problemId }) => {
    const roomName = `problem:${problemId}`;
    socket.leave(roomName);

    const usersSet = problemPresence.get(problemId);
    if (usersSet) {
      usersSet.delete(userId);

      if (usersSet.size === 0) {
        problemPresence.delete(problemId);
      }
    }

    io.to(roomName).emit("presence_update", {
      problemId,
      users: usersSet ? Array.from(usersSet) : [],
    });

    console.log(`🟡 User ${userId} left ${roomName}`);
  });

  /* SEND MESSAGE */
  socket.on("send_message", async ({ problemId, content }) => {
    const roomName = `problem:${problemId}`;

    try {
      const message = await prisma.message.create({
        data: {
          content,
          problemId,
          userId,
        },
      });

      io.to(roomName).emit("receive_message", message);
    } catch (err) {
      console.error("❌ Message error:", err);
    }
  });

  /* DISCONNECT */
  socket.on("disconnect", () => {
    for (const [problemId, usersSet] of problemPresence.entries()) {
      if (usersSet.has(userId)) {
        usersSet.delete(userId);

        const roomName = `problem:${problemId}`;

        io.to(roomName).emit("presence_update", {
          problemId,
          users: Array.from(usersSet),
        });

        if (usersSet.size === 0) {
          problemPresence.delete(problemId);
        }
      }
    }

    console.log("🔴 Disconnected:", userId);
  });
});

/* -------------------- START SERVER -------------------- */
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
