const knex = require("../library/dB");
const redis = require('../library/redis')

async function getUserByEmail(email) {
  return knex("users")
    .select("*")
    .where({ email })
    .then((rows) => (Array.isArray(rows) && rows[0]) || null);
}

async function addCount(email, count){
  return knex("count_email")
  .insert({email,count});
}

async function deleteCount(email){
  return knex("count_email")
  .delete("*")
  .where({email})
}

async function findCount(email){
  return knex("count_email")
  .select("*")
  .where({email})
  .then((rows) => {
    return rows.length;
  })
}

async function getUserById(userid) {
  const cacheKey = userid;
  
  return redis.get(cacheKey)
    .catch((err) => null)
    .then((value) => {
      if(value) return JSON.parse(value);

      return knex("users")
      .select("*")
      .where({ userid })
      .then((rows) => {
        const user = rows[0];
        if(!user) return null;
        console.log(user);

        redis.set(userid, JSON.stringify(user));
        return user;
      })
  })
  
}

async function getPassword(email) {
  return knex("auth_email")
    .select("password")
    .where({ email })
    .then((password) => (Array.isArray(password) && password[0]?.password) || null);
}

async function addUser(userid, email, username) {
  return knex("users")
  .insert({ userid, email, username });
}

async function addPassword(email, password) {
  return knex("auth_email")
  .insert({
    email,
    password,
  });
}

module.exports = {
  getUserByEmail,
  addUser,
  addPassword,
  getPassword,
  getUserById,
  findCount,
  addCount, 
  deleteCount
};
