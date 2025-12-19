import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
import {
  getTodos,
  createTodo,
  deleteTodo,
  getAllTodosAdmin,
  updateTodo, // ✅ NEW
} from "../controllers/todoController.js";

const router = express.Router();

/**
 * USER ROUTES
 */

// Get logged-in user's todos
router.get("/", protect, getTodos);

// Create todo for logged-in user
router.post("/", protect, createTodo);

// Update todo (user edits own, admin edits any) ✅
router.put("/:id", protect, updateTodo);

// Delete todo (user deletes own, admin deletes any)
router.delete("/:id", protect, deleteTodo);

/**
 * ADMIN ROUTES
 */

// Get all todos across all users (ADMIN ONLY)
router.get("/admin", protect, isAdmin, getAllTodosAdmin);

export default router;
