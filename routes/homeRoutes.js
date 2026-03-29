const express = require("express");
const router = express.Router();
const { getHomeProducts } = require("../controllers/homeController");

// Home products
router.get("/products-home", getHomeProducts);

module.exports = router;