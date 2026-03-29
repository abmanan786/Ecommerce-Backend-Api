const shopProducts = require("../data/shopProducts");

// Single product by ID
exports.getSingleProduct = (req, res) => {
  const { id } = req.params;
  const product = shopProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};