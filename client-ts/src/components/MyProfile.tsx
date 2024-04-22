import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logoutImg from "../assets/logout.svg";
import { logout } from "../features/auth/authSlice";
import styles from "./styles/MyProfile.module.css";

const MyProfile = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/auth/login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    dispatch(logout());
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
