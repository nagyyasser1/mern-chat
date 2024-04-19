import { login as loginAction } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const useAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const accessToken = localStorage.getItem("accessToken") as any;
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as any);

  if (accessToken && userInfo) {
    const { fullName, username, email, gender, profilePic } = userInfo;
    dispatch(
      loginAction({
        token: accessToken,
        userInfo: { fullName, username, email, gender, profilePic },
      })
    );
  }

  return isLoggedIn;
};

export default useAuth;
