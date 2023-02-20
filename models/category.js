const knex = require("../library/dB");

async function getCategory(){
    return knex("category")
    .select("*")
    .then((rows) => (Array.isArray(rows) && rows) || null);
}

module.exports = {
    getCategory,
}