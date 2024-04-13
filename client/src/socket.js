import { io } from "socket.io-client";
import { API_URL } from "./api/index";

export const socket = io(API_URL, {
  query: {
    token: localStorage.getItem("accessToken"),
  },
});
