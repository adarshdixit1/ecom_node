const Product = require("../models/productSchema");

//get the product list
const getProduct = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments();

        res.status(200).send({
            name: "Success",
            data: products,
            pagination: {
                totalItems: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                pageSize: limit,
            },
        });
    } catch (error) {
        next(error);
    }
};

//to create the product
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Each uploaded file will include a `path` (URL) and `filename`
        const images = req.files ? req.files.map((file) => file.path) : [];

        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            images,
        });
        await product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

//To get product by Id
const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = Product.find({ productId });
        if (!product) {
            res.status(200).send({
                name: "Success",
                message: "Product is not found"
            });
        } else {
            res.status(200).send({
                name: "Success",
                data: product,
            });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProduct,
    createProduct,
    getProductById
};
