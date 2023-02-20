const knex = require("../library/dB");

async function getProducts(){
    return knex("products")
    .select("*")
    .then((rows) => (Array.isArray(rows) && rows) || null);
}

async function getProductsById(id){
    return knex("products")
    .select("*")
    .where({id})
    .then((rows) => (Array.isArray(rows) && rows[0]) || null);
}


module.exports = {
    getProducts, getProductsById
}
