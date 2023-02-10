const knex = require("../library/dB");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { isEmailValid } = require("../helpers/validation");
const {
  getUserByEmail,
  addUser,
  addPassword,
  getUserforLogin,
} = require("../models/user");

async function registration(req, res) {
  const {
     email, 
     username, 
     password,
     } = req.body;

  if (!email || !username || !password || !isEmailValid(email)) {
    return res.status(400).send("Invalid Details");
  }

  getUserByEmail(email).then(async (user) => {
    if (user) {
      return res.status(401).send("User already exists");
    }

    const userid = uuidv4();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const isPassAdded = await addPassword(email, hashedPassword).catch(
      (err) => {
        console.log(err);
        return false;
      }
    );

    if (isPassAdded) {
      addUser(userid, email, username)
        .then(() => res.send("Registered Successfully"))
        .catch((err) => {
          console.log(err);
          return res.send("Failed to Register");
        });
    }
  });
}

async function login(req, res) {
  const { 
    email, 
    password,
   } = req.body;

  if (!email || !password || !isEmailValid()) {
    return res.status(401).send("Please enter all the fields.");
  }

  const db_data = await getUserforLogin(email);

  if (db_data === "") return res.status(400).send("email not found");

  const isCorrect = await bcrypt.compare(password, db_data.password);

  if (!isCorrect) return res.status(400).send("email or password is wrong");
  return res.send("Logged in Successully");
}

module.exports = {
  login,
  registration,
};
