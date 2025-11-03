const Product = require("../models/productSchema");
const fs = require("fs");
const path = require('path');
const ExcelJS = require('exceljs');

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
    const fileName = `products_${Date.now()}.xlsx`;

    const filePath = path.join(__dirname,'../../uploads/excel', fileName);
    fs.mkdirSync(path.dirname(filePath),{recursive:true});

    //for stream
    const stream = fs.createWriteStream(filePath);
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream });
    const worksheet = workbook.addWorksheet('Products')

    worksheet.addRow([
      'Name', 'Description', 'Price', 'Category', 'Stock', 'Ratings Count', 'Average Rating', 'Created At', 'Updated At'
    ]).commit();

    // take the data from db
    const cursor = Product.find().populate('category').cursor();

    for await (const product of cursor) {
      const avgRating = product.ratings.length
        ? (product.ratings.reduce((s, r) => s + r.rating, 0) / product.ratings.length).toFixed(2)
        : 'N/A';

      worksheet.addRow([
        product.name,
        product.description,
        product.price,
        product.category ? product.category.name : '',
        product.stock,
        product.ratings.length,
        avgRating,
        product.createdAt,
        product.updatedAt
      ]).commit();
    }

    await workbook.commit();

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/excel/${fileName}`;

    res.json({
      success: true,
      message: 'Excel file generated successfully',
      downloadUrl: fileUrl
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
