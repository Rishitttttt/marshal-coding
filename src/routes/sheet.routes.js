import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getSheets } from "../controllers/sheet.controller.js";
import { getResumeProblem } from "../controllers/sheet.controller.js";


const router = express.Router();

router.get("/sheets", authMiddleware, getSheets);
router.get("/resume", authMiddleware, getResumeProblem);


export default router;
