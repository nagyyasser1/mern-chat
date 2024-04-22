import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { socket } from "../../socket";
import { toggleMenu } from "../../app/applicatoinSlice";
import { selectUserInfo } from "../auth/authSlice";
import { Chat, setSelectedChat } from "./chatSlice";

import styles from "./styles/ChatItem.module.css";

const ChatItem = ({ chat }: { chat: Chat }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);

  const recieverInfo = chat.participants.find(
    (participant) => participant.username !== userInfo.username
  );

  const handleSelectedChat = () => {
    // Emit "getChat" event with chat ID or other relevant data
    socket.emit("getChat", chat._id);

    socket.on("retrievedChat", (retrievedChat) => {
      // Update state with retrieved chat data
      dispatch(setSelectedChat(retrievedChat));
    });

    dispatch(toggleMenu());
  };

  return (
    <li className={styles.chatItem} onClick={handleSelectedChat}>
      <img src={recieverInfo?.profilePic} />
      <div className={styles.chatItem_info}>
        <p>{recieverInfo?.username}</p>
        <p>{chat?.messages[chat?.messages?.length - 1]?.message}</p>
      </div>
    </li>
  );
};

export default ChatItem;
