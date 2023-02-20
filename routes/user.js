const express = require("express");
const route = express.Router();
const {me} = require('../controllers/user');
const auth = require('../middlewares/authenticator');

route.get("/me",auth,me);

module.exports = route