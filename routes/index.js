const express = require("express");
const app = express();

const authRoutes = require("./auth");
const productRoutes = require("./products");
const userRoutes = require("./user");

app.use("/auth", authRoutes);
app.use("/", productRoutes);
app.use("/",userRoutes);

module.exports = app;
