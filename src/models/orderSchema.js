const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' },
  paymentInfo: {
    method: String,
    transactionId: String
  },
  shippingAddress: Object
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
