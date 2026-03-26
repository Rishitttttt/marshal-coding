import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import prisma from "./config/db.js";
import { verifyAccessToken } from "./config/jwt.js";
import { isAllowedOrigin } from "./utils/cors.js";

const PORT = process.env.PORT || 5000;

const corsOrigin = (origin, callback) => {
  if (isAllowedOrigin(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error("Not allowed by CORS"));
};

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

io.use((socket, next) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers?.authorization?.split(" ")[1];

  if (!token) {
    return next(new Error("Unauthorized"));
  }

  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return next(new Error("Unauthorized"));
  }

  socket.user = decoded;
  next();
});

const problemPresence = new Map();

io.on("connection", (socket) => {
  const userId = socket.user.userId;
  console.log("Connected:", userId);

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
  });

  socket.on("leave_problem", ({ problemId }) => {
    const roomName = `problem:${problemId}`;
    socket.leave(roomName);

    const usersSet = problemPresence.get(problemId);
    if (usersSet) {
      usersSet.delete(userId);

      io.to(roomName).emit("presence_update", {
        problemId,
        users: Array.from(usersSet),
      });

      if (usersSet.size === 0) {
        problemPresence.delete(problemId);
      }
    }
  });

  socket.on("typing", ({ problemId }) => {
    socket.to(`problem:${problemId}`).emit("user_typing", {
      userId,
    });
  });

  socket.on("send_message", async ({ problemId, content }) => {
    const roomName = `problem:${problemId}`;

    try {
      const message = await prisma.message.create({
        data: {
          content,
          problemId,
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      io.to(roomName).emit("receive_message", message);
    } catch (err) {
      console.error("Message error:", err);
    }
  });

  socket.on("disconnect", () => {
    for (const [problemId, usersSet] of problemPresence.entries()) {
      if (usersSet.has(userId)) {
        usersSet.delete(userId);

        io.to(`problem:${problemId}`).emit("presence_update", {
          problemId,
          users: Array.from(usersSet),
        });

        if (usersSet.size === 0) {
          problemPresence.delete(problemId);
        }
      }
    }

    console.log("Disconnected:", userId);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
