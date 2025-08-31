import express from "express";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.Model.js";

const router = express.Router();

// GET logged-in user's info
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
