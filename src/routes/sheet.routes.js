import { Router } from "express";
import { createSheet, getSheets } from "../controllers/sheet.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createSheet);
router.get("/", getSheets);

export default router;
