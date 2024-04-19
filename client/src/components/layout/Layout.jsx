import SelectedChat from "../chat/SelectedChat";
import UsersList from "../users/UsersList";
import Search from "../global/Search";
import Profile from "../global/Profile";
import ChatList from "../chat/ChatList";
import "./layout.css";
import { useEffect, useState } from "react";
import { socket } from "../../socket";

const Layout = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [chatId, setChatId] = useState("");
  const [reciever, setReciever] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chatlist", (chats) => {
      setChats(chats);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <main>
      <aside>
        <Search setIsSearch={setIsSearch} />
        {isSearch ? (
          <UsersList setReciever={setReciever} />
        ) : (
          <ChatList chats={chats} setChatId={setChatId} />
        )}
        <Profile />
      </aside>
      <SelectedChat chatId={chatId} reciever={reciever} />
    </main>
  );
};

export default Layout;
