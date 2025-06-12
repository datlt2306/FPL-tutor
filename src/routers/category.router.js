import express from "express";
import { getCategories, getCategoryById, createCategory } from "../controllers/category.controller";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);

export default router;
