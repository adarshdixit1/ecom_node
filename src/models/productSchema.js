const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [String],
    stock: Number,
    ratings: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
