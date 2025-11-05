const { ORDER_STATUS } = require("../constant/role.const");
const Cart = require("../models/cartSchema");
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");

//to handle the checkout
const checkoutOrder = async (req, res, next) => {
  try {
    // get the user detail
    const user = req.user;
    if (!user || !user.id) {
      const error = new Error("User not found");
      error.status = 401;
      return next(error);
    }

    //find the user cart
    const cart = await Cart.findOne({ userId: user.id });
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).send({
        name: "Error",
        message: "Cart is empty or not found",
      });
    }

    // Calculate total amount
    let totalAmount = 0;
    let requiredItems = [];
    for (const item of cart.items) {
      const product = await Product.findOne({_id:item.productId});
      if (product) {
        totalAmount += product.price * item.quantity;
        requiredItems.push({
          productId: item?.productId,
          quantity: item?.quantity,
          price: product.price * item.quantity,
        });
      }
    }

    const order = new Order({
      userId: user.id,
      items: requiredItems,
      totalAmount: totalAmount,
      status: ORDER_STATUS.pending,
    });
    await order.save();

    res.status(201).send({
        name: "Success",
        message: "Order placed successfully",
        orderId: order._id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkoutOrder,
};
