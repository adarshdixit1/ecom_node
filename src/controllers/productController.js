const Product = require("../models/productSchema");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

//get the product list
const getProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("category")
      .skip(skip)
      .limit(limit);
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
    const productId = req.params.id;
    const product = await Product.findById({ _id: productId });

    if (!product) {
      res.status(200).send({
        name: "Success",
        message: "Product is not found",
      });
    }

    res.status(200).send({
      name: "Success",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getExcelOfProduct = async (req, res, next) => {
  try {
    // Fetch all products and populate category field to get category names
    const allProduct = await Product.find().populate("category");

    if (!allProduct || allProduct.length === 0) {
      return res
        .status(404)
        .json({ name: "Not Found", message: "No data found" });
    }

    // Map products to flatten category name for Excel
    const dataForExcel = allProduct.map((product) => ({
      Name: product.name,
      Description: product.description,
      Price: product.price,
      Category: product.category ? product.category.name : "",
      Stock: product.stock,
      RatingsCount: product.ratings.length,
      AverageRating:
        product.ratings.length > 0
          ? (
              product.ratings.reduce((sum, r) => sum + r.rating, 0) /
              product.ratings.length
            ).toFixed(2)
          : "N/A",
      CreatedAt: product.createdAt,
      UpdatedAt: product.updatedAt,
    }));

    // Create workbook
    const worksheet = xlsx.utils.json_to_sheet(dataForExcel);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Products");

    // Define file path
    const fileName = `products_${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, "../../uploads/excel", fileName);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write file to disk
    xlsx.writeFile(workbook, filePath);

    // Generate public URL (assuming you’re serving static files)
    const fileUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/excel/${fileName}`;

    return res.status(200).json({
      success: true,
      message: "Excel file generated successfully",
      downloadUrl: fileUrl,
    });
  } catch (error) {
    next(error);
  }
};

// end

module.exports = {
  getProduct,
  createProduct,
  getProductById,
  getExcelOfProduct,
};
