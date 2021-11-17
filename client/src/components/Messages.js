import React from "react";

const Messages = ({ messageList, userName }) => {
  return (
    <div className="message-display">
      {messageList.map((message, ind) => {
        if (message.userName === userName) {
          return (
            <div className="chat-bubble user-chat-bubble">
              <div>{message.userName}</div>
              <div>{message.text}</div>
            </div>
          );
        } else {
          return (
            <div className="chat-bubble other-chat-bubble">
              <div>{message.userName}</div>
              <div>{message.text}</div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Messages;
