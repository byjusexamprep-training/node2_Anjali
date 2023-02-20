const express = require("express");
const { allProducts, productById,} = require("../controllers/product");
const route = express.Router();

route.get("/products", allProducts);
route.get("/product",productById);
// route.post("/categories",);

module.exports = route;
