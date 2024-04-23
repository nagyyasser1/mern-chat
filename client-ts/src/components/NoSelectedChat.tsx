import styles from "./styles/NoSelectedChat.module.css";
import menuImgUri from "../assets/menu.svg";
import { useAppDispatch } from "../app/hooks";
import { toggleMenu } from "../app/applicatoinSlice";

const NoSelectedChat = () => {
  const dispatch = useAppDispatch();

  const handleMenuIconClicked = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className={styles.noSelectedChat}>
      <div className={styles.noSelectedChat_menuImg_container}>
        <img src={menuImgUri} onClick={handleMenuIconClicked} />
      </div>
      <div className={styles.noSelectedChat_header}>
        <h1>Welcome to Whatsapp</h1>
      </div>
      <div className={styles.noSelectedChat_content}>
        <p>Select chat to start</p>
        <p>Or, Search new User to chat with!</p>
      </div>
    </div>
  );
};

export default NoSelectedChat;
