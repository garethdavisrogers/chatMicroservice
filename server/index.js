const http = require("http");
const express = require("express");
const app = express();
const port = 3000;
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const createCluster = require("./cluster");
app.use(express.static("./client/public"));
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(data);
    createCluster(port);
  });
  socket.on("new-message", (data) => {
    console.log(data);
    socket.to(data.roomName).emit("receive-message", data);
  });
  socket.on("disconnect", () => {
    console.log("user has left");
    createCluster(port);
  });
});

server.listen(port, () => {
  console.log("node is listening");
});
