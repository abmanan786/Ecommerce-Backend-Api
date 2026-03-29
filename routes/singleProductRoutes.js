const express = require("express");
const router = express.Router();
const { getSingleProduct } = require("../controllers/singleProductController");

// Single product
router.get("/product/:id", getSingleProduct);

module.exports = router;