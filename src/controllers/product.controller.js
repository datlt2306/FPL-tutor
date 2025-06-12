import Product from "../models/product.model";

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const getProducts = async (req, res) => {
    const options = {
        sort: {
            price: -1,
        },
        limit: 10git,
    };
    try {
        const products = await Product.paginate({}, options);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
