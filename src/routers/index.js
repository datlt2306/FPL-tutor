import express from "express";
import categoryRouter from "./category.router";
import productRouter from "./product.router";

const router = express.Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
export default router;
