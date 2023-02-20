const { v4: uuidv4 } = require("uuid");
const { isEmailValid } = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  getUserByEmail,
  addUser,
  addPassword,
  getPassword,
  addCount,
  findCount,
  deleteCount
} = require("../models/user");

const JWT_KEY = "hjnhgffrntyutrrtymujnytertyunytrdsv"

let count =0;

async function registration(req, res) {
  const { email, username, password } = req.body;

  if (!email || !username || !password || !isEmailValid(email)) {
    return res.status(400).send("Invalid Details");
  }

  getUserByEmail(email).then(async (user) => {
    if (user) {
      return res.status(401).send("User already exists");
    }

    const userid = uuidv4();
    const passwordHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const isPassAdded = await addPassword(email, passwordHash).catch((err) => {
      console.log(err);
      return false;
    });

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

  const { email, password } = req.body;
   
  addCount(email, count)

  findCount(email).then(async(dbcount) => {
    if(dbcount < 3){
      { 
        if (!email || !password || !isEmailValid(email)) {
          return res.status(401).send("Please enter all the fields.");
        }
      
        const passwordHash = crypto
          .createHash("sha256")
          .update(password)
          .digest("hex");
      
        const user = await getUserByEmail(email).catch((err) => {
          console.log(err);
        });
      
        if (!user) return res.status(400).send("email not found");
      
        if (user){
          await getPassword(email)
            .then((password) => {
              if (password === passwordHash) {
                const token = jwt.sign({userid:user.userid}, JWT_KEY);
                res.cookie("token",token);
                deleteCount(email)
                return res.status(200).send(token);
              }
              res.status(400).send("email or password is wrong");
            })
            .catch((err) => {
              console.log(err);
              return res.status(400).send("email or password is wrong");
            });
          }
       }
    }
    else {
      res.send("submited more than 3 times.")
      if(dbcount === 3){
      setTimeout(() => {
        deleteCount(email)
      }, 10000);
     }
    }
  }
  ).catch((err) =>{
    console.log(err)
     res.send("An error occured")
  }) 
}


module.exports = {
  login,
  registration,
};
