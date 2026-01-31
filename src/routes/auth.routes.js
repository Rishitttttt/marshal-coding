import { Router } from "express";
import {
  register,
  login,
  refresh,
} from "../controllers/auth.controller.js";

console.log("🔥 THIS AUTH ROUTES FILE IS ACTIVE");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
