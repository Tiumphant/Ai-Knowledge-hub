// routes/docRoute.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getDocs,
  addDoc,
  updateDoc,
  searchDocs,
} from "../controller/Doc.Controller.js";

const router = Router();

// Docs CRUD
router.get("/", requireAuth, getDocs);
router.post("/", requireAuth, addDoc);
router.put("/:id", requireAuth, updateDoc);

// Search endpoint
router.get("/search", requireAuth, searchDocs);

export default router;
