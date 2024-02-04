const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const http = require('http');
const { Server } = require('socket.io')
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

const server = http.createServer(app)

//middleware routes
app.use(express.json())
app.use(cookieParser())
app.use("*", cors({ origin: true, credentials: true })) // for cookie
// app.use(cors()) // for cookie
app.use("/users", userRouter);
// app.get("/", (req,res)=>{
//     res.send("hello world");
// });


// socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// for play with strengers
var roomno = 1;
var full = 0;
var totalPlayers = 0;
// for play with friends
// var index=0;
var playerArr = [];
var friend = [];
// var room=1;
var roomFull = 0;
io.on('connection', (socket) => {
    console.log(`user Connected => ${socket.id}`);
    totalPlayers++
    // socket.emit("show_room_id", data)
    console.log("totalPlayers => ", totalPlayers / 2);
    socket.broadcast.emit("total_online_player", totalPlayers)

    socket.on("play_with_Stranger", (username) => {
        console.log("username => ", username);
        playerArr[full] = username;
        console.log("Array=>", playerArr);
        if (!(playerArr[0] == playerArr[1])) {
            socket.join("room-" + roomno);
            io.sockets.in("room-" + roomno).emit("connected_room", { username, roomno });
            console.log("rooms=>", socket.rooms);
            full++;
            if (full >= 2) {
                full = 0;
                roomno++
            }
        } else {
            console.log("strenger not found!");
        }
    })

    socket.on("initial_share_data", ({ User, roomno, isStrenger }) => {
        console.log("User => ", User);
        console.log("roomno => ", roomno);
        console.log("isStrenger => ", isStrenger);
        User.id = socket.id;
        User.roomNo = roomno;

        // shere player typing-game-data into the room
        // socket.to("room-" + roomno).emit("strenger-joining", User);
        isStrenger ? socket.to("room-" + roomno).emit("strenger-joining", User) : socket.to(roomno).emit("friend-joining", User);
    })

    socket.on("share_data", ({ User, Room, isStrenger }) => {
        // shere player typing-game-data into the room
        if (User.roomNo == Room || Room) {
            isStrenger ? socket.to("room-" + Room).emit("get_strenger_data", User) : socket.to(Room).emit("get_strenger_data", User);
        } else {
            console.log("room number is not same", Room);
        }
    })

    // _______________________________________________

    // socket.on("join_room", ({ name, room }) => {
    //     socket.join(room);
    //     io.sockets.in(room).emit("frined_joinded_inRoom", { name, room });
    //     console.log("rooms=>", socket.rooms);
    //     roomFull++;
    //     if (roomFull >= 2) {
    //         roomFull = 0;
    //         room++ //beacuse only 2 play can play these game
    //     }
    // }

    socket.on("join_room", ({ name, Room }) => {
        console.log("these are the data => ", name, Room);
        const roomsCount = io.sockets.adapter.rooms.get(Room);
        console.log("io.sockets.adapter.rooms.get(Room) =>> ", roomsCount);
        if (roomsCount && countClientsInRoom(roomsCount) >= 2) {
            // Emit an event to alert the client that the room is full
            socket.emit("room_full", "Room is full. Cannot join." );
            console.log("userr exit sended");
            return; // Stop further execution
        }

        // if (io.sockets.adapter.rooms.get(Room) && io.sockets.adapter.rooms.get(Room).size >= 2) {
        //     // Emit an event to alert the client that the room is full
        //     socket.emit("room_full", { message: "Room is full. Cannot join." });
        //     return; // Stop further execution
        // }
        socket.join(Room);
        io.sockets.in(Room).emit("frined_joinded_inRoom", { name: name, Room: Room });
        console.log("rooms=>", socket.rooms);
        roomFull++;
        if (roomFull >= 2) {
            roomFull = 0;
            Room++ //beacuse only 2 play can play these game
        }
    })
    // console.log("username => ", username);
    // playerArr[full] = username;
    // console.log("Array=>", playerArr);
    // if (!(playerArr[0] == playerArr[1])) {
    //     socket.join("room-" + roomno);
    //     io.sockets.in("room-" + roomno).emit("connected_room", { username, roomno });
    //     console.log("rooms=>", socket.rooms);
    //     full++;
    //     if (full >= 2) {
    //         full = 0;
    //         roomno++
    //     }
    // }else{
    //     console.log("strenger not found!");
    // }

    socket.on('disconnect', () => {
        console.log('user ' + socket.id + ' disconnected');
        totalPlayers--
        console.log("totalPlayers => ", totalPlayers / 2);
    });
})

// listen on the given port
server.listen(PORT, () => console.log(`application running on the ${PORT} port.`));
// app.listen(PORT, () => console.log(`application running on the ${PORT} port.`));
// used server
// io.on('connection', function(socket) {
//     console.log('A user just connected with id ' + socket.id);
//     socket.on("change room", function(data) {
//         // this SHOULD return a list of all rooms this user is in
//         var socketsRooms = socket.rooms;
//         console.log(socket.rooms) //{ '/#3tE4Up5PRbTfsU0JAAAD': '/#3tE4Up5PRbTfsU0JAAAD' }
//         console.log(typeof socket.rooms) // object
//         // Loop through the rooms and leave them
//         for (var room in socketsRooms) {
//             console.log('LEAVING ROOM: ', room);
//             socket.leave(room);
//         }

//         // Join the new room
//         socket.join(data.newroom);
//     });
//     socket.on('disconnect', function() {
//         console.log('user ' + socket.id + ' disconnected');
//     });
// })

function countClientsInRoom(room) {
    let count = 0;
    if (room && room.size) {
        // Loop through each socket in the room and count them
        room.forEach((value, key) => {
            if (key !== undefined) {
                count++;
            }
        });
    }
    return count;
}