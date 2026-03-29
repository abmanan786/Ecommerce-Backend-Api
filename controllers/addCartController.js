// controllers/addCartController.js

// Simple in-memory cart (demo purpose)
let cart = [];

// Get all cart items
exports.getCartItems = (req, res) => {
  res.json({ cart });
};

// Add product to cart (if exists then increases quantity)
exports.addToCart = (req, res) => {
  const { id, quantity = 1 } = req.body;

  const pid = parseInt(id, 10);
  const qty = parseInt(quantity, 10);

  if (Number.isNaN(pid)) {
    return res.status(400).json({ message: "Invalid product id", cart });
  }

  const addQty = Number.isNaN(qty) ? 1 : Math.max(1, qty);

  // Check if product already in cart
  const existing = cart.find((item) => item.id === pid);
  if (existing) {
    existing.quantity += addQty;
  } else {
    cart.push({ id: pid, quantity: addQty });
  }

  return res.json({ message: "Product added to cart", cart });
};

// ✅ NEW: Update quantity of a cart item (set quantity)
exports.updateCartQuantity = (req, res) => {
  const pid = parseInt(req.params.id, 10);
  const qty = parseInt(req.body.quantity, 10);

  if (Number.isNaN(pid)) {
    return res.status(400).json({ message: "Invalid product id", cart });
  }

  const item = cart.find((i) => i.id === pid);
  if (!item) {
    return res.status(404).json({ message: "Item not found", cart });
  }

  if (Number.isNaN(qty)) {
    return res.status(400).json({ message: "Invalid quantity", cart });
  }

  item.quantity = Math.max(1, qty);
  return res.json({ message: "Quantity updated", cart });
};

// Remove product from cart
exports.removeFromCart = (req, res) => {
  const pid = parseInt(req.params.id, 10);

  if (Number.isNaN(pid)) {
    return res.status(400).json({ message: "Invalid product id", cart });
  }

  cart = cart.filter((item) => item.id !== pid);
  return res.json({ message: "Product removed from cart", cart });
};

// ✅ NEW: Clear cart
exports.clearCart = (req, res) => {
  cart = [];
  return res.json({ message: "Cart cleared", cart });
};
