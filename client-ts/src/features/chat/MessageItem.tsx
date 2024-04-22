import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../auth/authSlice";

import styles from "./styles/MessageItme.module.css";

const MessageItem = ({ msg }: any) => {
  const userInfo = useAppSelector(selectUserInfo);
  let belongsToMe = false;

  if (msg.senderId === userInfo._id) {
    belongsToMe = true;
  }

  return (
    <li
      key={msg._id}
      className={`${
        belongsToMe ? styles.messageItem_left : styles.messageItem_right
      }`}
    >
      <p
        className={`${
          belongsToMe
            ? styles.messageItem_msg_left
            : styles.messageItem_msg_right
        }`}
      >
        {msg.message}
      </p>
    </li>
  );
};

export default MessageItem;
