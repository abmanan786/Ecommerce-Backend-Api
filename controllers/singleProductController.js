const homeProducts = require("../data/homeProducts");
const shopProducts = require("../data/shopProducts");

// Single product by ID (home + shop)
exports.getSingleProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const product =
    homeProducts.find((p) => p.id === id) ||
    shopProducts.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
};
