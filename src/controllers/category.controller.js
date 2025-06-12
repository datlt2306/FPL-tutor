import Category from "../models/category.model";
import Product from "../models/product.model";

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        return res.status(201).json(category);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.paginate();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).select("name");
        const products = await Product.find({ category: category._id }).select("-category");
        return res.status(200).json({
            ...category.toObject(),
            products,
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
