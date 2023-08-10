const express = require("express");
const userRouter = express.Router();
const { signup, login, logout, getAllUser, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const authentication = require("../middleware/Authentication")

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", authentication, logout);
userRouter.get("/", getAllUser)
userRouter.get("/:id", authentication, getUserById) // this using to show user dashboard
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)


module.exports = userRouter;