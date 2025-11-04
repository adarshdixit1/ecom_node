const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
