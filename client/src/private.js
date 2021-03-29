import { socket } from "./sockets";
// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

export default function Private({ id }) {

    // const elemRef = useRef();
    // const pm = useSelector ((state) => state.p)

    // useEffect(() => {
    //     const newScrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    //     elemRef.current.scrollTop = newScrollTop;
    // }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("my private message", {message: e.target.value, recipient_id: id});
            e.target.value = "";
        }
    };

    return (
        <textarea onKeyDown={keyCheck}></textarea>
    );
}