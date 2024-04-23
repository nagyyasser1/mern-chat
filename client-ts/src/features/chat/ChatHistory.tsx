import { memo, useEffect } from "react";
import { socket } from "../../socket";
import { selectChats, setChats, addNewChat } from "./chatSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./styles/ChatHistory.module.css";
import ChatItem from "./ChatItem";
import { shallowEqual } from "react-redux";

const ChatItemMemo = memo(ChatItem);

const ChatHistory = () => {
  const chats = useAppSelector(selectChats, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit("getChatList");
    socket.on("chatlist", (chats: any) => {
      dispatch(setChats(chats.reverse()));
    });
    socket.on("newChat", (data: any) => {
      dispatch(addNewChat(data));
    });

    return () => {
      socket.off("getChatList");
      socket.off("chatlist");
      socket.off("newChat");
    };
  }, [socket.id]);

  return (
    <ul className={styles.chatHistory}>
      {chats?.map((chat) => {
        return <ChatItemMemo key={chat._id} chat={chat} />;
      })}
    </ul>
  );
};

export default ChatHistory;
