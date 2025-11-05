const express = require('express');
const { checkoutOrder,handlePayment,getOrderDetail } = require('../controllers/ordersController');
const router = express.Router();

//handle checkout
router.post('/checkout',checkoutOrder)

//get the order detail
router.get('',getOrderDetail)

//payment
router.patch('/payment',handlePayment)

module.exports = router;