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
      const product = await Product.findOne({ _id: item.productId });
      if (product) {
        totalAmount += product.price * item.quantity;
        requiredItems.push({
          productId: item?.productId,
          quantity: item?.quantity,
          price: product.price * item.quantity,
        });
      }
    }

    // make the order
    const order = new Order({
      userId: user.id,
      items: requiredItems,
      totalAmount: totalAmount,
      status: ORDER_STATUS.pending,
    });
    await order.save();
    // end

    // empty the cart
    await Cart.deleteOne({ userId: user.id }); 
    // end

    res.status(201).send({
      name: "Success",
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    next(error);
  }
};

//to get the order detail
const getOrderDetail = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).send({
        name: "error",
        message: "user not found",
      });
    }
    const order = await Order.find({ userId: user.id });
    res.status(201).send({
      name: "Success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
//end

// handle the payment
const handlePayment = async (req, res, next) => {
    try {
      const user = req.user;
      const orderId = req.params.id;
      const { method, amount } = req.body;
  
      if (!user || !user.id) {
        const error = new Error("User not found");
        error.status = 401;
        return next(error);
      }
  
      const order = await Order.findOne({ _id:orderId });
  
      if (!order) {
        return res.status(404).send({
          name: "error",
          message: "Order not found",
        });
      }
  
      if (order.totalAmount !== amount) {
        return res.status(400).send({
          name: "error",
          message: "Payment amount mismatch",
        });
      }
  
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          status: ORDER_STATUS.paid,
          paymentInfo: {
            method,
            amount,
          },
        },
        { new: true }
      );
  
      res.status(200).send({
        name: "Success",
        message: "Payment successful, order updated",
        order: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  };  
// end

module.exports = {
  checkoutOrder,
  handlePayment,
  getOrderDetail
};
