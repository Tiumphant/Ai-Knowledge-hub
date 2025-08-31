import { Router } from "express";
import {
  register,
  login,
  getMe,
  getUsers,
  getUserById,
} from "../controller/Auth.Controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, getMe);

// User routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

export default router;
