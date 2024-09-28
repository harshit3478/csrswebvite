import io from "socket.io-client";
console.log("backend url : " , import.meta.env.VITE_APP_API_URL)
export const socket = io(import.meta.env.VITE_APP_SOCKET_URL);