const express = require("express");
const userRouter = express.Router();
const { signup, login, logout, getAllUser, getUserById, updateUser, deleteUser, updateTyping, updateMode, contactUs, settings } = require("../controllers/userController");
const authentication = require("../middleware/Authentication")

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", authentication, logout);
userRouter.get("/", getAllUser)
userRouter.get("/about", authentication, getUserById) // this using to show user dashboard
userRouter.patch("/:id", updateUser)
userRouter.patch("/updatetyping/:id", authentication, updateTyping)
userRouter.patch("/mode/:id", authentication, updateMode)
userRouter.patch("/contactus/:id", authentication, contactUs)
userRouter.patch("/settings/:id", authentication, settings)
userRouter.delete("/:id", deleteUser)


module.exports = userRouter;