import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logoutImg from "../assets/logout.svg";
import { logout } from "../features/auth/authSlice";
import styles from "./styles/MyProfile.module.css";
import { resetChatSlice } from "../features/chat/chatSlice";

const MyProfile = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    dispatch(resetChatSlice());
    dispatch(logout());
    window.location.reload();
    navigate("/auth/login");
  };

  return (
    <div className={styles.myprofile}>
      <div className={styles.myprofile_info}>
        <img src={userInfo.profilePic} />
        <p>{userInfo.username}</p>
      </div>
      <img
        className={styles.myprofile_logout_img}
        src={logoutImg}
        onClick={handleLogOut}
      />
    </div>
  );
};

export default MyProfile;
