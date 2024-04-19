import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type User = {
  fullName: string;
  username: string;
  email: string;
  gender: number;
  profilePic: string;
};

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  userInfo: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: "",
  userInfo: {
    fullName: "",
    username: "",
    email: "",
    gender: 0,
    profilePic: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; userInfo: User }>) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.userInfo = {
        fullName: "",
        username: "",
        email: "",
        gender: 0,
        profilePic: "",
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
