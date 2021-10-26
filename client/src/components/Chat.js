import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import Messages from "./Messages";

const Chat = ({ socket, roomName, userName }) => {
  const [inputText, setInputText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const submitText = async (e) => {
    e.preventDefault();
    const messageData = {
      roomName: roomName,
      userName: userName,
      text: inputText,
    };
    await socket.emit("new-message", messageData);
    setMessageList((prevState) => [...prevState, messageData]);
    setInputText("");
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageList((prevState) => [...prevState, data]);
    });
  }, [socket]);

  return (
    <div>
      <div id="chatbox">
        {messageList.length > 0 && <Messages messageList={messageList} />}
      </div>
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

export default Chat;
