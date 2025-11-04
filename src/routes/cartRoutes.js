const express = require("express");
const {
  getCartDetail,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const router = express.Router();

//to get the cart product
router.get("", getCartDetail);

//to add product in cart
router.post("/add", addToCart);

//to remove the product in cart
router.delete("/remove", removeFromCart);

module.exports = router;
