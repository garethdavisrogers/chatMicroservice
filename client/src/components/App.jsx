import React, { useState } from "react";
const socket = io("http://localhost:3000");

const App = () => {
  const [inputText, setInputText] = useState("");
  const submitText = () => {
    console.log(inputText);
  };
  return (
    <div>
      <h1>Chat MicroService</h1>
      <div>Chats go here</div>
      <input
        type="text"
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button onClick={submitText}>Send</button>
    </div>
  );
};

export default App;
