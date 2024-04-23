import { useEffect } from "react";
import { login as loginAction } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const useAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") as any;
    const userInfo = JSON.parse(localStorage.getItem("userInfo") as any);
    if (accessToken && userInfo) {
      const { fullName, username, email, gender, profilePic, _id } = userInfo;
      dispatch(
        loginAction({
          token: accessToken,
          userInfo: { _id, fullName, username, email, gender, profilePic },
        })
      );
    }
  }, [dispatch]);

  return isLoggedIn;
};

export default useAuth;
