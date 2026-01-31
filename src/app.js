import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sheetRoutes from "./routes/sheet.routes.js";
import messageRoutes from "./routes/message.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/sheets", sheetRoutes);
app.use("/api/messages", messageRoutes);



export default app;
