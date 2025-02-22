import { Router } from "express";
import { createBlog, getListBlogs, getOneBlog, removeBlog, updateBlog } from "../controllers/blog";

const router = Router();

router.post("/blogs", createBlog);
router.get("/blogs", getListBlogs);
router.get("/blogs/:id", getOneBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", removeBlog);
export default router;
