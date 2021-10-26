import React from "react";

const Messages = ({ messageList }) => {
  return (
    <div>
      {messageList.map((message, ind) => (
        <div key={ind}>{message.text}</div>
      ))}
    </div>
  );
};

export default Messages;
