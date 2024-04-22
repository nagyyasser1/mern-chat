import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  query: {
    token: localStorage.getItem("accessToken"),
  },
});
