const Product = require("../models/productSchema")

//get the product list
const getProduct=async(req,res,next)=>{
    try {
        const product = await Product.find({});
        res.status(200).send({
            name: "Success",
            data:product
        })
    } catch (error) {
        next(error)
    }
};


//to create the product
const createProduct=(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports={
    getProduct,
    createProduct
}