import React, { useState, useEffect } from "react";

const Login = ({ loginSubmit }) => {
  const [nameField, setNameField] = useState("");
  const [roomField, setRoomField] = useState("");

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setNameField(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="room"
          onChange={(e) => {
            setRoomField(e.target.value);
          }}
        />
        <button
          onClick={() => {
            loginSubmit(nameField, roomField);
          }}
        >
          Submit Info
        </button>
      </form>
    </div>
  );
};

export default Login;
