const knex = require("../library/dB");

async function getUserByEmail(email) {
    return knex("users")
      .select("*")
      .where({ email })
      .then((rows) => (Array.isArray(rows) && rows[0]) || null);
  }

async function getUserforLogin(email) {
  return knex("auth_email")
    .select("*")
    .where({ email })
    .then((rows) => (Array.isArray(rows) && rows[0]) || null);
}

async function addUser(userid,email, username) {
  return knex("users")
  .insert(
    { userid,
      email, 
      username 
    })
    
}

async function addPassword(email, password) {
  return knex("auth_email")
  .insert({
     email, 
     password, 
    })
}

module.exports = {
  getUserByEmail,
  addUser,
  addPassword,
  getUserforLogin
};
