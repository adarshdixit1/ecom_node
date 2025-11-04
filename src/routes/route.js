const express = require('express');
const router = express.Router();

//routes
const authRoutes = require("./userRoutes");
const categoryRoutes = require('./categoryRoutes')
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes")
const { verifyToken } = require("../helper/token");

//app routes
router.use("/auth", authRoutes);

//verify routes

// category routes
router.use('/category',verifyToken,categoryRoutes)

//product routes
router.use("/product",verifyToken ,productRoutes)

//cart routes
router.use('/cart', verifyToken,cartRoutes)


module.exports = router;