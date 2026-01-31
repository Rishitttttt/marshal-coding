import express from "express";
import { getMessagesByProblem } from "../controllers/message.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/problem/:problemId",
  authMiddleware,
  getMessagesByProblem
);

export default router;
