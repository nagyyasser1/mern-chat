import { Outlet, Navigate, useLocation } from "react-router-dom";
import "./auth.css";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
  const location = useLocation();
  const authenticated = useAuth();

  if (authenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  } else {
    return (
      <div className="mt-2">
        <Outlet />;
      </div>
    );
  }
};

export default Auth;
