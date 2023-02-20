const { getUserById } = require("../models/user");

async function me(req,res){
    
    const payload = req.session;
    getUserById(payload.userid)
    .then((user) => {
        return res.send(user)
    })
    .catch((err) => {
      res.send("User not found");
      console.log(err);
    })
}

module.exports ={
    me,
}