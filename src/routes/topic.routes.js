import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getTopicsBySheet } from "../controllers/topic.controller.js";

const router = express.Router();

router.get("/sheets/:sheetId/topics", authMiddleware, getTopicsBySheet);

export default router;
