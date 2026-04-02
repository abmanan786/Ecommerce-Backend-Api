const express = require("express");
const router = express.Router();
const { getShopProducts } = require("../controllers/shopController");

// Shop products (filters + pagination)
router.get("/products-shop", getShopProducts);

module.exports = router;