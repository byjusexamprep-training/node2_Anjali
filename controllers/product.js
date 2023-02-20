const { getProducts, getProductsById } = require("../models/products");

async function allProducts(req, res) {
  getProducts()
    .then(async (product) => res.status(200).send(product))
    .catch((err) => {
      console.log(err);
      return res.status(401).send("An Error Occured");
    });
}

async function productById(req, res) {
  const id = req.query.id;

  if (!id) return res.status(401).send("Error Occured");

  getProductsById(id)
    .then(async (product) => res.status(200).send(product))
    .catch((err) => {
      return res.status(401).send("Product not found");
    });
}

module.exports = {
  allProducts,
  productById,
};
