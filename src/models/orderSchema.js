const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: { type: String, enum: [1,2,3,4], default: 1 },
  paymentInfo: {
    method: String,
    amount: Number
  },
  shippingAddress: Object
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
