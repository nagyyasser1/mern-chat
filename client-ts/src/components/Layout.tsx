import { useState } from "react";
import ChatControlls from "../features/chat/ChatControlls";
import ChatHistory from "../features/chat/ChatHistory";
import ChatInfo from "../features/chat/ChatInfo";
import MessagesList from "../features/chat/MessagesList";
import MyProfile from "./MyProfile";
import SearchUser from "./SearchUser";
import styles from "./styles/Layout.module.css";
import UsersList from "../features/users/UsersList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMenuOpend, toggleMenu } from "../app/applicatoinSlice";

const Layout = () => {
  const [isSearch, setIsSearch] = useState(false);
  const isMenuOpend = useAppSelector(selectIsMenuOpend);

  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleMenu());
  };

  return (
    <main className={styles.layout}>
      <aside className={`${styles.aside} ${isMenuOpend && styles.d_m_n}`}>
        <section className={styles.aside_content}>
          <SearchUser setIsSearch={setIsSearch} />
          {isSearch ? <UsersList /> : <ChatHistory />}
          <MyProfile />
        </section>
        <div className={styles.aside_overlay} onClick={handleOverLayClicked} />
      </aside>
      <section className={styles.chat_section}>
        <div className={styles.chat_section_content}>
          <ChatInfo />
          <MessagesList />
          <ChatControlls />
        </div>
      </section>
    </main>
  );
};

export default Layout;
