import { chatMessages, chatMessage } from "./actions";
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
            console.log("chat maesae", msgs);
            store.dispatch(chatMessages(msgs));
        });

        // socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
    }
};
