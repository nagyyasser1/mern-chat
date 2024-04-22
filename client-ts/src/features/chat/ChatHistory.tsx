import { memo, useEffect, useState } from "react";
import { socket } from "../../socket";
import { selectChats, setChats, addNewChat } from "./chatSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import styles from "./styles/ChatHistory.module.css";
import ChatItem from "./ChatItem";
import { shallowEqual } from "react-redux";

const ChatItemMemo = memo(ChatItem);

const ChatHistory = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const chats = useAppSelector(selectChats, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chatlist", (chats: any) => {
      dispatch(setChats(chats));
    });
    socket.on("newChat", (data: any) => {
      dispatch(addNewChat(data));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("chatlist");
      socket.off("newChat");
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  if (!isConnected) {
    return <p>Connecting ... to socket.io !</p>;
  }
  return (
    <ul className={styles.chatHistory}>
      {chats?.map((chat) => {
        return <ChatItemMemo key={chat._id} chat={chat} />;
      })}
    </ul>
  );
};

export default ChatHistory;
