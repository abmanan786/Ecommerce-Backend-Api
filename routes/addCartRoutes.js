const express = require("express");
const router = express.Router();

const {
  getCartItems,
  addToCart,
  updateCartQuantity, // ✅ NEW
  removeFromCart,
} = require("../controllers/addCartController");

// Cart routes
router.get("/cart", getCartItems);
router.post("/cart", addToCart);

// ✅ NEW: update quantity (set quantity)
router.put("/cart/:id", updateCartQuantity);

router.delete("/cart/:id", removeFromCart);

module.exports = router;