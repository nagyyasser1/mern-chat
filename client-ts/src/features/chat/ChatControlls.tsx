import { useEffect, useState } from "react";
import { socket } from "../../socket"; // Assuming socket is imported correctly
import sendImgUri from "../../assets/send.svg";
import styles from "./styles/ChatControlls.module.css"; // Corrected the file name
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../auth/authSlice";
import {
  Message,
  addMessage,
  addMessageToChatList,
  selectedChatParticipants,
} from "./chatSlice";

const ChatControls = () => {
  // Corrected the component name
  const [content, setContent] = useState("");
  const userInfo = useAppSelector(selectUserInfo);
  const chatParticipants = useAppSelector(selectedChatParticipants);

  const dispatch = useAppDispatch();

  const receiver = chatParticipants?.find((p) => p._id !== userInfo._id);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSendMessage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent default form submission behavior (if applicable)

    if (content.trim()) {
      // Check if message content is not empty
      socket.emit("sendMessage", userInfo._id, receiver?._id, content); // Emit "sendMessage" event with content
      setContent(""); // Clear the input field after sending the message
    }
  };

  // Handle incoming messages
  useEffect(() => {
    const handleIncomingMessage = (data: Message, conversationId: string) => {
      if (
        data.senderId === receiver?._id ||
        data.receiverId === receiver?._id
      ) {
        dispatch(addMessage(data));
        dispatch(addMessageToChatList({ message: data, conversationId }));
      } else {
        dispatch(addMessageToChatList({ message: data, conversationId }));
      }
    };

    socket.on("newMessage", handleIncomingMessage);

    // Clean up the socket subscription when the component unmounts
    return () => {
      socket.off("newMessage", handleIncomingMessage);
    };
  }, [dispatch, receiver]); // Added dispatch and receiver to the dependency array

  return (
    <div className={styles.chatControlls}>
      <input
        className={styles.chatControlls_input}
        type="text"
        value={content}
        placeholder="Type a message"
        onChange={handleContentChange}
        autoFocus
      />
      <button
        className={styles.chatControlls_sendBtn}
        onClick={handleSendMessage}
      >
        <img src={sendImgUri} alt="send" />
      </button>
    </div>
  );
};

export default ChatControls; // Corrected the component name
