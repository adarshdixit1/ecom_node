const express = require('express');
const router = express.Router();

//routes
const authRoutes = require("./userRoutes");
const categoryRoutes = require('./categoryRoutes')
const productRoutes = require("./productRoutes");
const { verifyToken } = require("../helper/token");
const { verifyRole } = require('../helper/checkRole');

//app routes
router.use("/auth", authRoutes);

//verify routes

// category routes
router.use('/category',verifyToken,categoryRoutes)

//product routes
router.use("/product",verifyToken ,productRoutes)


module.exports = router;