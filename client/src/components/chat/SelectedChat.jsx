import { useEffect, useRef, useState } from "react";
import NoChatSelected from "./NoChatSelected";
import sendImg from "../../assets/send.svg";
import "./chat.css";
import { socket } from "../../socket";
import Message from "../global/Message";

const SelectedChat = ({ chatId, receiver }) => {
  const [content, setContent] = useState("");
  const [chatData, setChatData] = useState(null);

  const { _id: userId } = JSON.parse(localStorage.getItem("userInfo"));
  const receiverVic =
    receiver || chatData?.participants?.find((p) => p._id === userId);

  const chatMessagesContainerRef = useRef(null); // useRef hook to store reference

  useEffect(() => {
    const fetchChat = async () => {
      if (chatId) {
        try {
          // Emit "getChat" event with chatId
          socket.emit("getChat", chatId);

          // Listen for the "retrievedChat" event from the server
          socket.on("retrievedChat", (retrievedChat) => {
            setChatData(retrievedChat);
          });

          // Listen for "newMessage" event and update messages in state
          socket.on("newMessage", (newMessage) => {
            setChatData((prevChat) => ({
              ...prevChat,
              messages: [...prevChat.messages, newMessage],
            }));
          });
        } catch (error) {
          console.error("Error fetching chat:", error);
          // Handle errors gracefully (e.g., display error message to user)
        }
      }
    };

    fetchChat();

    // Clean up listeners on unmount
    return () => {
      socket.off("retrievedChat");
      socket.off("newMessage");
    };
  }, [chatId]); // Dependency array ensures effect runs on chatId change

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!content.trim()) return; // Prevent sending empty messages

    socket.emit("sendMessage", userId, receiverVic._id, content);
    setContent(""); // Clear input field after sending
  };

  // Scroll to bottom whenever chatData or its messages change
  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      const chatMessagesContainer = chatMessagesContainerRef.current;
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }, [chatData, chatData?.messages]); // Dependency array for scrolling

  if (!chatId && !receiverVic) {
    return <NoChatSelected />;
  }

  // Display loading indicator while waiting for chat data
  if (!chatData) {
    return <NoChatSelected />;
  }

  const messages = chatData.messages;

  return (
    <section className="selected-chat">
      <div className="chat-msgs-container" ref={chatMessagesContainerRef}>
        {messages.map((m) => (
          <Message m={m} key={m._id} />
        ))}
      </div>
      <div className="selected-chat_action d-f g-1">
        <input
          type="text"
          value={content}
          placeholder="Type a message"
          onChange={handleContentChange}
          autoFocus
        />
        <button onClick={handleSendMessage}>
          <img src={sendImg} />
        </button>
      </div>
    </section>
  );
};

export default SelectedChat;
