const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const Connection = require("./db/connect");
const cors = require('cors');

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
app.use(cookieParser())
// app.use(cors())
app.use("*",cors({origin:true,credentials:true})) // for cookie

app.use("/users", userRouter);
app.get("/", (req, res) => {
    res.send("hello randomType")
})


// listen on the given port
app.listen(PORT, () => console.log(`application running on the ${PORT} port.`));