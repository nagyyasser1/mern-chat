import React from "react";
import "./global.css";

const Message = ({ m }) => {
  const { _id: userId } = JSON.parse(localStorage.getItem("userInfo"));

  const amI = m?.senderId === userId;

  return (
    <div className={`${amI ? "message-left" : "message-right"}`}>
      <div
        className={`${amI ? "message-content-left" : "message-content-right"}`}
      >
        <p className={`message-text`}>{m.message}</p>
      </div>
    </div>
  );
};

export default Message;
