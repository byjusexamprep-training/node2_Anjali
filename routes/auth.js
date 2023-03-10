const express = require("express");
const route = express.Router();
const { registration, login } = require("../controllers/auth");

route.post("/registration", registration);
route.post("/login", login);

module.exports = route;
