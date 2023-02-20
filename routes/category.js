const express = require("express");
const { allCategory } = require("../controllers/category");
const route = express.Router();

route.get("/categories", allCategory);

module.exports = route;
