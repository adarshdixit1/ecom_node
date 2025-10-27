const Product = require("../models/productSchema")

//get the product list
const getProduct=async(res,req,next)=>{
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
const createProduct=(res,req,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports={
    getProduct,
    createProduct
}