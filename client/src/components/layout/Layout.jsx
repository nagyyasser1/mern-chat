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

  console.log("isConnected:", isConnected);
  console.log(chats);

  return (
    <main>
      <aside>
        <Search setIsSearch={setIsSearch} />
        {isSearch ? <UsersList /> : <ChatList chats={chats} />}
        <Profile />
      </aside>
      <SelectedChat />
    </main>
  );
};

export default Layout;
