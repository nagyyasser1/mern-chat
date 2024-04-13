import React, { useEffect, useState } from "react";
import "./chat.css";

const ChatList = ({ chats }) => {
  console.log("chats", chats);

  console.log("single", chats[1]);

  return (
    <div className="chat-list">
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>
            <p>{chat.messages[0]?.message}</p>
            {/* <p>{chat.lastMessage}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ex1 = [
  {
    _id: "6613a76ecaea224597b91ff8",
    messages: [
      {
        _id: "6613a7a1caea224597b91fff",
        message: "heloo",
        senderId: "660e90fbb4bdba404362b6bf",
        receiverId: "660e90fbb4bdba404362b6bf",
        createdAt: "2024-04-08T08:15:29.482Z",
        updatedAt: "2024-04-08T08:15:29.482Z",
      },
    ],
    participants: [
      {
        _id: "660e90fbb4bdba404362b6bf",
        fullName: "nagy yasser ahmed fathy",
        gender: "male",
        username: "nagyy8751",
        password: "ddd",
        profilePic: "https://avatar.iran.liara.run/public/boy?use",
        createdAt: "2024-04-04T11:37:31.375Z",
        updatedAt: "2024-04-04T11:37:31.375Z",
      },
      {
        _id: "660e90fbb4bdba404362b6bf",
        fullName: "nagy yasser ahmed fathy",
        gender: "male",
        username: "nagyy8751",
        password: "ddd",
        profilePic: "https://avatar.iran.liara.run/public/boy?use",
        createdAt: "2024-04-04T11:37:31.375Z",
        updatedAt: "2024-04-04T11:37:31.375Z",
      },
    ],
    createdAt: "2024-04-08T08:14:38.301Z",
    updatedAt: "2024-04-08T08:15:29.482Z",
  },
];

const ex2 = [
  {
    _id: "6613a76ecaea224597b91ff8",
    messages: [
      {
        message: "heloo",
        createdAt: "2024-04-08T08:15:29.482Z",
        updatedAt: "2024-04-08T08:15:29.482Z",
      },
    ],
    participants: [
      {
        _id: "660e90fbb4bdba404362b6bf",
        username: "nagyy8751",
        profilePic: "https://avatar.iran.liara.run/public/boy?use",
      },
      {
        _id: "660e90fbb4bdba404362b6bf",
        username: "nagyy8751",
        profilePic: "https://avatar.iran.liara.run/public/boy?use",
      },
    ],
    createdAt: "2024-04-08T08:14:38.301Z",
    updatedAt: "2024-04-08T08:15:29.482Z",
  },
];

export default ChatList;
