import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../auth/authSlice";
import { createNewChat } from "../chat/chatSlice";
import styles from "./styles/UserItem.module.css";

const UserItem = ({ user }: any) => {
  const userInfo = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const handleSelectUser = () => {
    dispatch(
      createNewChat({
        _id: "",
        participants: [user, userInfo],
        messages: [],
        lastMessage: "",
        createdAt: "",
        updatedAt: "",
      })
    );
  };
  return (
    <li className={styles.userItem} onClick={handleSelectUser}>
      <img src={user?.profilePic} />
      <p>{user?.username}</p>
    </li>
  );
};

export default UserItem;
