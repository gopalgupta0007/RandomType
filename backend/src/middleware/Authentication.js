const jwt = require("jsonwebtoken");
const users = require("../models/User");

const Authentication = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const userData = await users.findOne({_id:verifyToken._id, "tokens.token":token})
        if(!userData) console.log("err");
        req.token = token;
        req.user = userData;
        req.userId = userData._id;
        // console.log(req.user);
        next()
    } catch (error) {
        res.status(401).send("Unauthorized: no token provided")
        console.error(error);
    }
}

module.exports = Authentication;