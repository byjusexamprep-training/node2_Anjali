const {getCategory} = require("../models/category");

async function allCategory(req, res) {
    getCategory()
      .then(async (category) => res.status(200).send(category))
      .catch((err) => {
        console.log(err);
        return res.status(401).send("An Error Occured");
      });
  }

  module.exports = {
    allCategory,
  }