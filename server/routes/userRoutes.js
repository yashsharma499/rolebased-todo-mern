import express from "express";
import {
  getAllUsers,
  createUser,        // legacy (kept)
  updateUserStatus,
  inviteUser,        // ✅ NEW
  setPassword,       // ✅ NEW
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

/* ================================
   ADMIN ROUTES
================================ */

// Get all users
router.get("/", protect, isAdmin, getAllUsers);

// Legacy create user (not used in UI now)
router.post("/", protect, isAdmin, createUser);

// ✅ Invite user (send email)
router.post("/invite", protect, isAdmin, inviteUser);

// Suspend / Activate user
router.patch("/:id/status", protect, isAdmin, updateUserStatus);

/* ================================
   PUBLIC ROUTES
================================ */

// ✅ User sets password via invite link
router.post("/set-password", setPassword);

export default router;

