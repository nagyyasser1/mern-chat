import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleMenu } from "../../app/applicatoinSlice";
import styles from "./styles/ChatInfo.module.css";
import menuImgUri from "../../assets/menu.svg";
import { selectedChatParticipants } from "./chatSlice";
import { selectUserInfo } from "../auth/authSlice";

const ChatInfo = () => {
  const participants = useAppSelector(selectedChatParticipants);
  const userInfo = useAppSelector(selectUserInfo);

  const recieverInfo = participants.find(
    (participant) => participant.username !== userInfo.username
  );

  const dispatch = useAppDispatch();

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={styles.chatInfo}>
      <img
        src={menuImgUri}
        className={styles.chatInfo_menuImg}
        onClick={handleToggleMenu}
      />
      <div className={styles.chatInfo_content}>
        <img src={recieverInfo?.profilePic} />
        <p>{recieverInfo?.username}</p>
      </div>
    </div>
  );
};

export default ChatInfo;
