const Cart = require('../models/cartSchema')

const getCartDetail=async(req,res,next)=>{
    try {
        const user = req.user;
        const cartDetail = await Cart.find({userId:user.id || ''});
        res.status(200).send({
            name:"Success",
            data:cartDetail
        })
        
    } catch (error) {
        next(error)
    }
}

const addToCart=async(req,res,next)=>{
    const user = req.user;
    const {items} = req.body;

    try {
        if(!user || !user.id){
            const error = new Error('User not found');
            error.status = 500;
            next(error);
        }
        const cart = new Cart({
            userId:user.id,
            items:items
        });
        await cart.save();
        res.status(200).send({
            name: "Success",
            message: "Product added successfully"
        });
    } catch (error) {
        next(error);
    }
}

const removeFromCart=async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports={
    getCartDetail,
    addToCart,
    removeFromCart
}