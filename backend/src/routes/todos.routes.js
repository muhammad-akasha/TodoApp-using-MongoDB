import express from "express";
import {
  addTodo,
  allTodos,
  deleteTodo,
  getSingleTodo,
  updateTodoByID,
} from "../controllers/todos.controller.js";

const router = express.Router();

router.post("/addTodo", addTodo);
router.get("/todos", allTodos);
router.get("/todo/:id", getSingleTodo);
router.put("/updateTodo/:id", updateTodoByID);
router.delete("/deleteTodo/:id", deleteTodo);

export default router;
