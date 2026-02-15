import express from "express";
import {
  markProblemSolved,
  unmarkProblemSolved,
} from "../controllers/progress.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { saveProblemNotes } from "../controllers/progress.controller.js";



const router = express.Router();

router.post("/solve", authMiddleware, markProblemSolved);
router.post("/unsolve", authMiddleware, unmarkProblemSolved);
router.post("/notes", authMiddleware, saveProblemNotes);


export default router;
