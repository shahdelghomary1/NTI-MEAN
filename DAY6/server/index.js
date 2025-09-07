const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "*" }
});


app.use(express.static(path.join(__dirname, "../client")));

let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("userList", Object.values(users));
    io.emit("message", { user: "system", text: `${username} joined the chat` });
  });

  socket.on("chatMessage", (msg) => {
    io.emit("message", { user: users[socket.id], text: msg });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", users[socket.id]);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    io.emit("message", { user: "system", text: `${username} left the chat` });
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
