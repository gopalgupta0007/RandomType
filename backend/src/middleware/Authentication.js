// const jwt = require("jsonwebtoken");
// const users = require("../models/User");

// const Authentication = async(req,res,next) => {
//     try {
//         const token = req.cookies.jwt;
//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//         const userData = await users.findOne({_id:verifyToken._id, "tokens.token":token})
//         if(!userData) console.log("err");
//         req.token = token;
//         req.user = userData;
//         req.userId = userData._id;
//         // console.log(req.userId);
//         // console.log(token);
//         next()
//     } catch (error) {
//         res.status(401).send("Unauthorized: no token provided")
//         console.error(error);
//     }
// }

// module.exports = Authentication;


const jwt = require("jsonwebtoken");
const users = require("../models/User");

const Authentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log("Token:", token); // Log the token to see if it's present

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Verify Token:", verifyToken); // Log the verified token

        const userData = await users.findOne({
            _id: verifyToken._id,
            "tokens.token": token,
        });

        console.log("User Data:", userData); // Log the user data

        if (!userData) {
            console.log("User not found"); // Log if user data is not found
            throw new Error("User not found");
        }

        req.token = token;
        req.user = userData;
        req.userId = userData._id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send("Unauthorized: no token provided or token expired");
    }
};

module.exports = Authentication;
