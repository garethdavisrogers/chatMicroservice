import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./Login";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3000");

const App = () => {
  const [userName, setUserName] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const loginSubmit = (name, room) => {
    if (name !== "" && room !== "") {
      setUserName(name);
      setRoomName(room);
      setLoggedIn(true);
      socket.emit("join-room", room);
    }
  };

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <div>
      <h1>Chat MicroService</h1>
      <h3>Name: {userName}</h3>
      <h3>Room: {roomName}</h3>
      {!loggedIn && <Login loginSubmit={loginSubmit} />}
      {loggedIn && (
        <Chat socket={socket} roomName={roomName} userName={userName} />
      )}
    </div>
  );
};

export default App;
