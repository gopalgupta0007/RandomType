const jwt = require("jsonwebtoken")
const User = require("../models/User")

const Authentication = (req,res,next) => {
    try {
        const token = req.cookie.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const userData = User.findOne({_id:verifyToken._id, "tokens.token":token})
        if(!userData) console.log("err");
        req.token = token;
        req.user = userData;
        next()
    } catch (error) {
        res.status(401).send("Unauthorized: no token provided")
        console.error(error);
    }
}

module.exports = Authentication;