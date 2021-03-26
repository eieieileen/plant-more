import {
    chatMessages,
    chatBericht,
    onlineUser,
    userJoined,
    userLeft,
} from "./actions";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("userConnected", (data) => {
            console.log("data in socket.js: ", data);
        });

        socket.on("sending back to client", (data) => {
            console.log("sending back to client in socket.js: ", data);
        });

        socket.on("chatMessages", (msgs) => {
            // console.log("chat maesae", msgs);
            store.dispatch(chatMessages(msgs));
        });

        socket.on("This is the new Message", (msg) => {
            store.dispatch(chatBericht(msg));
        });

        socket.on("online users", (onlineUsers) => {
            // console.log("online users", onlineUsers);
            store.dispatch(onlineUser(onlineUsers));
        });

        socket.on("new user just joined", (newUser) => {
            // console.log("new user just joined", newUser);
            store.dispatch(userJoined(newUser));
        });

        socket.on("user left", (userGone) => {
            // console.log("user just left: ", userGone);
            store.dispatch(userLeft(userGone));
        });
    }
};
