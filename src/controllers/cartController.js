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
    
    try {
        const user = req.user;
        const {items} = req.body;
        if(!user || !user.id){
            const error = new Error('User not found');
            error.status = 500;
            return next(error);
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

const removeProduct = async (req, res, next) => {
    try {
        const user = req.user;
        const productId = req.params.id;

        if (!user || !user.id) {
            const error = new Error('User not found');
            error.status = 500;
            return next(error);
        }

        if (!productId) {
            const error = new Error('Product ID is required');
            error.status = 400;
            return next(error);
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { userId: user.id },
            { $pull: { items: { productId: productId } } },
            { new: true }
        );

        if (!updatedCart) {
            const error = new Error('Cart not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).send({
            name: "Success",
            message: "Product removed from cart",
            cart: updatedCart
        });
    } catch (error) {
        next(error);
    }
};


module.exports={
    getCartDetail,
    addToCart,
    removeProduct
}