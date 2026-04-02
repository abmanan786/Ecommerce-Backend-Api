const shopProducts = require("../data/shopProducts");

// Shop page products + filters + pagination
exports.getShopProducts = (req, res) => {
  const { search, category, brand, page = 1, limit = 6 } = req.query;

  let filtered = [...shopProducts];

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (brand) {
    filtered = filtered.filter((p) => p.brand === brand);
  }

  const pageNumber = parseInt(page);
  const itemsPerPage = parseInt(limit);
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = pageNumber * itemsPerPage;

  const resultProducts = filtered.slice(startIndex, endIndex);

  res.json({
    total: filtered.length,
    products: resultProducts,
  });
};