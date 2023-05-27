const express = require("express");
const app = express();
const Connection = require("./db/connect");


// Port number
require('dotenv').config("RandomType/backend/.env");
const PORT = process.env.PORT || 5000;


// connecting to the database
Connection();
console.log("backed started");


// routes
const userRouter = require("./routers/userRouter");


//middleware routes
app.use(express.json())
app.get("/",(req,res)=>res.send("hello randomType"))
app.use("/users", userRouter);


// listen on the given port
app.listen(PORT, () => console.log(`application running on the ${PORT} port.`));