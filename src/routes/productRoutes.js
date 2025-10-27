const express = require('express');
const { getProduct,createProduct } = require('../controllers/productController');
const router = express.Router();

router.get("/product", getProduct);
router.post("/add/product", createProduct)

module.exports = router;