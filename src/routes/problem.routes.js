import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getProblemsByTopic,
  getProblemById,
} from "../controllers/problem.controller.js";

const router = express.Router();

router.get("/topics/:topicId/problems", authMiddleware, getProblemsByTopic);
router.get("/problems/:problemId", authMiddleware, getProblemById);

export default router;
