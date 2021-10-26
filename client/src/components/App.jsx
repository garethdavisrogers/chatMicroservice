import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Login from "./Login";
const socket = io.connect("http://localhost:3000");

const App = () => {
  const [userName, setUserName] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [inputText, setInputText] = useState("");
  const loginSubmit = (name, room) => {
    if (name !== "" && room !== "") {
      setUserName(name);
      setRoomName(room);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  const submitText = (e) => {
    e.preventDefault();
    const chatbox = document.getElementById("chatbox");
    const chat = document.createElement("div");
    chat.innerText = inputText;
    chatbox.append(chat);
    setInputText("");
    socket.emit("new-message");
  };
  return (
    <div>
      <h1>Chat MicroService</h1>
      <h3>Name: {userName}</h3>
      <h3>Room: {roomName}</h3>
      {!loggedIn && <Login loginSubmit={loginSubmit} />}
      {loggedIn && (
        <div>
          <div id="chatbox">Chats go here</div>
          <form>
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
            <button onClick={submitText} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
