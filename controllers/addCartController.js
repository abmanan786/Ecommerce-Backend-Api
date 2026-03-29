// Simple in-memory cart (demo purpose)
let cart = [];

// Get all cart items
exports.getCartItems = (req, res) => {
  res.json(cart);
};

// Add product to cart
exports.addToCart = (req, res) => {
  const { id, quantity = 1 } = req.body;

  // Check if product already in cart
  const existing = cart.find((item) => item.id === parseInt(id));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: parseInt(id), quantity });
  }

  res.json({ message: "Product added to cart", cart });
};

// Remove product from cart
exports.removeFromCart = (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item.id !== parseInt(id));

  res.json({ message: "Product removed from cart", cart });
};