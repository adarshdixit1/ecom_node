const express = require('express');
const { getProduct,createProduct,getProductById,getExcelOfProduct } = require('../controllers/productController');
const upload = require('../helper/uploads');
const { verifyRole } = require('../helper/checkRole');
const router = express.Router();

//to get the product
router.get("", getProduct);

//to create the product
router.post("/add",upload.array('images', process.env.MAX_NUMBER_OF_IMAGE) ,verifyRole,createProduct)


//to product data into excel
router.get('/excel',getExcelOfProduct)

//to get the detail of specific product
router.get('/:id',getProductById)

module.exports = router;