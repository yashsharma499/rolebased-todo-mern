import Todo from "../models/Todo.js";

/* ================================
   GET USER TODOS
================================ */
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

/* ================================
   CREATE TODO
================================ */
export const createTodo = async (req, res) => {
  try {
    const { text, dueDate, priority } = req.body;

    const todo = await Todo.create({
      text,
      dueDate: dueDate || null,
      priority: priority || "medium",
      user: req.user._id,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

/* ================================
   DELETE TODO
================================ */
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // ✅ USER deletes own | ADMIN deletes any
    if (
      todo.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};

/* ================================
   ADMIN: GET ALL TODOS
================================ */
export const getAllTodosAdmin = async (req, res) => {
  try {
    const todos = await Todo.find().populate("user", "name email");
    res.json(todos);
  } catch {
    res.status(500).json({ message: "Failed to fetch admin todos" });
  }
};

/* ================================
   UPDATE TODO (USER OR ADMIN)
================================ */
export const updateTodo = async (req, res) => {
  try {
    const { text, completed, dueDate, priority } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // ✅ USER edits own | ADMIN edits any
    if (
      todo.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Update only if provided
    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (priority !== undefined) todo.priority = priority;

    await todo.save();
    res.json(todo);
  } catch {
    res.status(500).json({ message: "Failed to update todo" });
  }
};



