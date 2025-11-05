const express = require('express');
const { checkoutOrder } = require('../controllers/ordersController');
const router = express.Router();

//handle checkout
router.post('/checkout',checkoutOrder)

module.exports = router;