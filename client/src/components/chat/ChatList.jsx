import React from "react";
import "./chat.css";

const ChatList = ({ chats, setChatId }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSelect = (chatId) => {
    setChatId(chatId);
  };

  return (
    <div className="chat-list">
      <ul>
        {chats.map((chat) => (
          <li key={chat._id} onClick={() => handleSelect(chat._id)}>
            {chat.participants?.map((participant) => {
              if (participant._id === userInfo._id) return null;

              return (
                <div key={participant._id} id="chat-list-content">
                  <img
                    className="chat-list-content_img"
                    src={participant.profilePic}
                  />
                  <div id="chat-list-content_info">
                    <p>{participant.username}</p>
                    <p>{chat.messages[0]?.message}</p>
                  </div>
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
