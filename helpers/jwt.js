const jwt = require("jsonwebtoken");
const JWT_KEY = "hjnhgffrntyutrrtymujnytertyunytrdsv"

async function verifyToken(token){
     return new Promise((resolve, reject) => {
        jwt.verify(token,JWT_KEY, (err,payload) => { 
            if(err) return reject(err);
            resolve(payload)
        } )
    })
}

module.exports = {
    verifyToken,
}

