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
    let userFound;
    try {
        let is_password_correct;
        const { email, password } = req.body;
        if (!email || !password) { res.status(400).json({ massage: "invalid input data" }); }
        userFound = await Users.findOne({ email });
        if (userFound) {
            is_password_correct = await bcrypt.compare(password, userFound.password)
        } else {
            res.status(500).json({ massage: "data not found" })
        };
        if (!is_password_correct) { res.status(500).json({ massage: "data not found" }) };

        //jwt => jsonwebtoken
        token = await userFound.generateAuthToken();
        console.log("token =>", token);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 25892000000), // which is 25892000000=30days(30day * 24hour * 60mint * 60sec * 1000millisec)
            httpOnly: true
        })
    } catch (err) {
        return res.status(500).send(err);
    }
    return res.status(200).send({ massage: "login successfull", userFound });
}


const logout = async (req, res) => {
    res.clearCookie('jwt', { path: "/" })
    console.log("this user => ", req.user);
    // console.log("total token => ", Users.findOne({_id:req.user}));
    req.user.tokens = req.user.tokens.filter(currentToken => currentToken.token !== req.token)
    await req.user.save()
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
        // const id = req.params.id;
        var user = await Users.findById(req.userId);
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

const updateTyping = async (req, res) => {
    let updatedUser
    try {
        // console.log(req.user);
        // const authUserId = req.userId;
        const authUserId = req.params.id;
        const { wpm, acc } = req.body;
        // console.log("req.user => ",req.user);
        updatedUser = await Users.findByIdAndUpdate(
            authUserId,
            {
                $push: {
                    'data.typing_data.total_wpm': wpm,
                    'data.typing_data.total_accuracy': acc,
                },
            },
            { new: true }
        );
        // res.json(updatedUser.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    return res.status(200).send({ massage: "updated data successful" });
}

const updateMode = async (req, res) => {
    var updatedModes
    try {
        const authUserId = req.params.id;
        const { mode, text, time } = req.body;
        updatedModes = await Users.findByIdAndUpdate(
            authUserId,
            {
                $set: {
                    'data.mode': mode,
                    'data.text': text,
                    'data.time': time
                },
            },
            { new: true }
        );
        // res.json(updatedUser.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    return res.status(200).send({ massage: "mode updated data successful" });
}


const contactUs = async (req, res) => {
    var contactData
    try {
        const authUserId = req.params.id;
        const { message } = req.body;
        contactData = await Users.findByIdAndUpdate(
            authUserId,
            {
                $push: {
                    // 'data.typing_data.total_wpm': wpm,
                    'data.comments': { message }
                },
            },
            { new: true }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    return res.status(200).send({ massage: "message store successful" });
}

const settings = async (req, res) => {
    var settingData
    try {
        const authUserId = req.params.id;
        const { font, caret, sounds, theme, intro_animation } = req.body;
        settingData = await Users.findByIdAndUpdate(
            authUserId,
            {
                $set: {
                    'data.setting.font': font,
                    'data.setting.caret': caret,
                    'data.setting.sounds': sounds,
                    'data.setting.theme': theme,
                    'data.setting.intro_animation': intro_animation
                },
            },
            { new: true }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    return res.status(200).send({ massage: "settings updated successful" });
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


module.exports = { signup, login, logout, getAllUser, getUserById, updateUser, deleteUser, updateTyping, updateMode, contactUs, settings }




