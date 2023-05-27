const express = require("express");
const userRouter = express.Router();
const { signup, login, getAllUser, getUserById, updateUser, deleteUser } = require("../controllers/userController");


userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/", getAllUser)
userRouter.get("/:id", getUserById)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)


module.exports = userRouter;