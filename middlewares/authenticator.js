const { verifyToken } = require("../helpers/jwt");


async function auth(req, res, next){

    const auth_header = req.headers.authorization;
    if(!auth_header) return res.status(401).send("User not authorized");
    
    const token = auth_header.split(" ")[1];

    verifyToken(token)
    .then((payload) => {
        req.session=payload
        next();
    })
    .catch((err) => {
        console.log(err);
    })
} 

module.exports = auth