import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  autoConnect: false,
  auth: (cb) => {
    cb({ token: localStorage.getItem("accessToken") });
  },
});
