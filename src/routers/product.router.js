import express from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/product.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { productSchema } from "../validations/product.validation";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);

router.post("/", validateRequest(productSchema), createProduct);
router.put("/:id", validateRequest(productSchema), updateProduct);

export default router;
