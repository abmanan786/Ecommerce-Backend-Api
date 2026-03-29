const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addToCart,
  removeFromCart,
} = require("../controllers/addCartController");

// Cart routes
router.get("/cart", getCartItems);
router.post("/cart", addToCart);
router.delete("/cart/:id", removeFromCart);

module.exports = router;