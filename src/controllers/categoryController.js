const Category = require("../models/categorySchema")

// To get the category list
const getCategory=async(req,res,next)=>{
    try {
        const category = await Category.find({})
        res.status(200).json({
            success: true,
            data:category
        })
        
    } catch (error) {
        next(error)
    }
};
//end

//To get the category by Id
const getCategoryById=async(req,res,next)=>{
    try {
        const category_id = req.params.id
        const category = await Category.find({_id:category_id})
        res.status(200).json({
            success: true,
            data:category
        })
        
    } catch (error) {
        next(error)
    }
};
// end

// to create the category
const createCategory= async(req,res,next)=>{
    try {
        const {name,description} = req.body;
        const category = new Category({
            name,
            description
        })
        await category.save();
        res.status(200).json({
            success: true,
            category:category
        })
    } catch (error) {
        next(error)
    }
}
// end

//update the category
const updateCategory= async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
// end

module.exports={
    getCategory,
    createCategory,
    updateCategory,
    getCategoryById
}
