import "./global.css";
import logoutImg from "../../assets/logout.svg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    navigate("/auth/login");
  };
  return (
    <div className="profile">
      <div className="profile-info">
        <img src={userInfo?.profilePic} />
        <p>{userInfo?.username}</p>
      </div>
      <img className="logoutImg" src={logoutImg} onClick={handleLogout} />
    </div>
  );
};

export default Profile;
