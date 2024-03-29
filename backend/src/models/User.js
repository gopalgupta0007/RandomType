const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");


// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         minlength: [3, "length of name should be more then 3"],
//         required: true,
//         validate(uName) {
//             if (!validator.isAlphanumeric(uName)) {        // check if the string is an Alphanumeric (.isAlphanumeric(str,[option]))
//                 throw new Error("username is Invalid");
//             }
//         }
//     },
//     phoneno: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {          // check if the string is an email (.isEmail(str,[option]))
//                 throw new Error("Email is Invalid");
//             }
//         }
//     },
//     password: {
//         type: String,
//         minlength: 5,
//         required: true

//     },
//     date: {
//         type: Date,
//         default: Date.now,
//         require: true,
//         validate(currrentDate) {
//             if (!validator.isDate(currrentDate)) {
//                 throw new Error("Date is Invalid");     // format is a string and defaults to YYYY/MM/DD.
//             }
//         }
//     },
//     data: {
//         type: Object,
//         mode: "simple",
//         text: 50,
//         time: 30,
//         typing_data: {
//             total_wpm: [0],
//             total_accuracy: [0]
//         },
//         setting: {
//             font: {
//                 family: "roboto",
//                 size: "6xl"
//             },
//             caret: {
//                 style: "_",
//                 smooth: true
//             },
//             sounds: {
//                 volume: "mid",
//                 sounds: "click"
//             },
//             theme: "tomato",
//             intro_animation: true
//         },
//         comments: [
//             {
//                 message: String,
//                 msgDate: {
//                     type: Date,
//                     default: Date.now,
//                     require: true
//                 }
//             }
//         ],
//         default: {
//             mode: "simple",
//             text: 50,
//             time: 30,
//             typing_data: {
//                 total_wpm: [0],
//                 total_accuracy: [0],
//             },
//             setting: {
//                 font: {
//                     family: "roboto",
//                     size: "6xl"
//                 },
//                 caret: {
//                     style: "_",
//                     smooth: true
//                 },
//                 sounds: {
//                     volume: "mid",
//                     sound: "keyboard"
//                 },
//                 theme: "tomato",
//                 intro_animation: true
//             }
//         }
//     },
//     tokens: [
//         {
//             token: {
//                 type: String,
//                 require: true,
//                 unique: true
//             }
//         }
//     ]
// })

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, "length of name should be more then 3"],
        required: true,
        validate(uName) {
            if (!validator.isAlphanumeric(uName)) {        // check if the string is an Alphanumeric (.isAlphanumeric(str,[option]))
                throw new Error("username is Invalid");
            }
        }
    },
    phoneno: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {          // check if the string is an email (.isEmail(str,[option]))
                throw new Error("Email is Invalid");
            }
        }
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        require: true,
        validate(currrentDate) {
            if (!validator.isDate(currrentDate)) {
                throw new Error("Date is Invalid");     // format is a string and defaults to YYYY/MM/DD.
            }
        }
    },
    data: {
        type: Object,
        mode: String,
        text: Number,
        time: Number,
        required: true,
        typing_data: {
            total_wpm: [Number],
            total_accuracy: [Number]
        },
        setting: {
            font: {
                family: String,
                size: String,
            },
            caret: {
                style: String,
                smooth: Boolean,
            },
            sounds: {
                volume: String,
                sound: String,
            },
            theme: String,
            intro_animation: Boolean,
            required: true
        },
        default: {
            mode: "simple",
            text: 50,
            time: 30,
            typing_data: {
                total_wpm: [0],
                total_accuracy: [0],
            },
            setting: {
                font: {
                    family: "roboto",
                    size: "6xl"
                },
                caret: {
                    style: "_",
                    smooth: true
                },
                sounds: {
                    volume: "mid",
                    sound: "click"
                },
                theme: "black&white",
                theme: "tomato",
                intro_animation: true
            }
        },
        comments: [
            {
                type:Object,
                message: String,
                msgDate: {
                    type: Date,
                    default: Date.now,
                    required:true
                },
            }
        ]
    },
    tokens: [
        {
            token: {
                type: String,
                require: true,
                unique: true
            }
        }
    ]
})




// this .generateAuthToken method are use to generate unique token. 
UserSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);    //generate the token jwt.sign( user_id, JWT_Secret);
        this.tokens = this.tokens.concat({ token: token });
        this.save();
        return token;
    } catch (err) {
        console.error(err)
    }
}


// before save data into the database first run this .pre method which is use to hash the password.
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const users = new mongoose.model("user", UserSchema);

module.exports = users;









