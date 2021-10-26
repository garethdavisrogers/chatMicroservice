import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

const App = () => {
  const [inputText, setInputText] = useState("");

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
  );
};

export default App;
