const Users = require("../models/User");
const bcrypt = require("bcryptjs");



const signup = async (req, res) => {
    try {
        const { username, phoneno, email, password } = req.body;    // take data form frontend body
        const userData = await Users.findOne({ email: email });
        if (!username || !phoneno || !email || !password) {
            return res.status(500).json({ massage: "enter all correct data" });
        } else if (userData) {
            return res.status(422).json({ massage: "invalid input data, enter correct data" });
        } else {
            const userExist = new Users({ username, phoneno, email, password });
            // before saving the .pre method are goings to call first.
            await userExist.save();
        }

    } catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).json({ massage: "signup successfull" })
}



const login = async (req, res) => {
    let token;
    try {
        let is_password_correct;
        const { email, password } = req.body;
        if (!email || !password) { res.status(400).json({ massage: "invalid input data" }); }
        const userFound = await Users.findOne({ email });
        if (userFound) {
            is_password_correct = await bcrypt.compare(password, userFound.password)
        } else {
            res.status(500).json({ massage: "data not found" })
        };
        if (!is_password_correct) { res.status(500).json({ massage: "data not found" }) };
        console.log(userFound);
        //jwt => jsonwebtoken
        token = await userFound.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 25892000000), // which is 25892000000=30days(30day * 24hour * 60mint * 60sec * 1000millisec)
            httpOnly: true
        })
        // res.setHeader('Set-Cookie', `jwtoken=${token}; HttpOnly; Path=/`);
        // res.cookie("hello", "world")                     
        // res.cookie("jwt", token)
    } catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).json({ massage: "login successfull" });
}


const logout = async (req, res) => {
    res.clearCookie('jwt',{path:"/"})
    res.status(200).send("User Logout");
}



const getAllUser = async (req, res) => {
    let users;
    try {
        users = await Users.find();
        if (!users) {
            return res.status(500).json({ massage: "unexpected error occured!" });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).json({ users });
}



const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        var user = await Users.findById(id);
        if (!user) { return res.status(500).json({ massage: "unexpected error occured" }); }
    } catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).json({ massage: "data found", user });
}



const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        let user;
        user = await Users.findByIdAndUpdate(id, req.body, { new: true });   // .findByIdAndUpdate(id, changing, [optional])
        console.log(user);
        if (!user) { return res.status(500).json({ massage: "unexpected error occured!" }); }
    } catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).json({ massage: "update successful" });
}



const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        let user;
        user = await Users.findByIdAndDelete(id);
        if (!user) { return res.status(500).json({ massage: "unexpected error occured!" }); }
    } catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).json({ massage: "delete successful" });
}



module.exports = { signup, login, logout, getAllUser, getUserById, updateUser, deleteUser }




