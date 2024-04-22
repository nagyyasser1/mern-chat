import { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import MessageItem from "./MessageItem";
import { selectedChatMessages } from "./chatSlice";
import styles from "./styles/MessagesList.module.css";

const MessagesList = () => {
  const messages = useAppSelector(selectedChatMessages);

  // Ref to hold the list element
  const messagesListRef = useRef(null) as any;

  // Function to scroll to bottom after rendering
  const scrollToBottom = () => {
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  };

  // Use useEffect to scroll after render and on message updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ul ref={messagesListRef} className={styles.messagesList}>
      {messages.map((msg) => (
        <MessageItem msg={msg} key={msg._id} />
      ))}
    </ul>
  );
};

export default MessagesList;
