const homeProducts = require("../data/homeProducts");

// Home page ke 9 products
exports.getHomeProducts = (req, res) => {
  res.json(homeProducts);
};