const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require("socket.io")(server);
app.use(express.static("./client/public"));

io.on("connection", (socket) => {
  console.log("connected to socket");
  socket.on("new-message", () => {
    console.log("new message sent");
  });
  socket.on("disconnect", () => {
    console.log("user has left");
  });
});

server.listen(port, () => {
  console.log("node is listening");
});
