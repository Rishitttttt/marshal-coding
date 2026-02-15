import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import sheetRoutes from "./routes/sheet.routes.js";
import messageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import topicRoutes from "./routes/topic.routes.js";
import progressRoutes from "./routes/progress.routes.js";

const app = express();

/* ================= SECURITY MIDDLEWARE ================= */

// Security headers
app.use(helmet());

// Rate limiting (basic API protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP
  message: "Too many requests, please try again later.",
});

app.use(limiter);

/* ================= CORS ================= */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ================= BODY PARSING ================= */

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api", sheetRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", problemRoutes);
app.use("/api", topicRoutes);
app.use("/api/progress", progressRoutes);

/* ================= HEALTH CHECK ================= */

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ================= 404 HANDLER ================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= GLOBAL ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: "Internal server error",
  });
});

export default app;
