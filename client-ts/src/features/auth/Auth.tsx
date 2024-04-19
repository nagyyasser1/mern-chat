import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./styles/Auth.module.css";

const Auth = () => {
  const isLoggedIn = useAuth();

  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  } else {
    return (
      <div className={styles.auth}>
        <Outlet />
      </div>
    );
  }
};

export default Auth;
