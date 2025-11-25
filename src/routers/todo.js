import { Router } from "express";
import { createTodo, getListTodos, getOneTodo, removeTodo, updateTodo } from "../controllers/todo";

const router = Router();

router.post("/todos", createTodo);
router.get("/todos", getListTodos);
router.get("/todos/:id", getOneTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", removeTodo);

export default router;
