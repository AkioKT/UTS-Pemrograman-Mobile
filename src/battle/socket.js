// socket.js
import { io } from "socket.io-client";

// ganti dengan IP PC / servermu: misal http://192.168.1.10:3000
export const SERVER_URL = "http://192.168.1.6:3000";

let socket = null;
export function initSocket() {
  if (socket) return socket;
  socket = io(SERVER_URL, { transports: ["websocket"] });
  return socket;
}

export function getSocket() {
  return socket;
}
