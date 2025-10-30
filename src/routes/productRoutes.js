const express = require('express');
const { getProduct,createProduct,getProductById } = require('../controllers/productController');
const upload = require('../helper/uploads');
const router = express.Router();

//to get the product
router.get("", getProduct);

//to create the product
router.post("/add",upload.array('images', process.env.MAX_NUMBER_OF_IMAGE) ,createProduct)

//to get the detail of specific product
router.get('/:id',getProductById)

module.exports = router;