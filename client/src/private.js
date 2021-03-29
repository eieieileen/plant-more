import { socket } from "./sockets";
import { useSelector } from "react-redux";
// import { useEffect, useRef } from "react";
export default function Private({ id }) {
     const privateMessage = useSelector((state) => state.private && state.private);
    // const elemRef = useRef();
    // const pm = useSelector ((state) => state.p)

    // useEffect(() => {
    //     const newScrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    //     elemRef.current.scrollTop = newScrollTop;
    // }, []);



    // met useSelector de private messages overal renderen waar wil


    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("my private message", {message: e.target.value, recipient_id: id});
            e.target.value = "";
        }
    };

    return (
        <div>
            {privateMessage &&
                privateMessage.map((privateMessage, index) => (
                    <div key={index}>
                        <img src={privateMessage.imageurl}></img>
                        <p>
                            {privateMessage.first_name}
                            {privateMessage.last_name}
                            {privateMessage.message}
                        </p>
                    </div>
                ))}
            ;<textarea onKeyDown={keyCheck}></textarea>
        </div>
    );
}