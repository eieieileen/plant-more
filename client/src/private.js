import { socket } from "./sockets";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "./private.css";
import { Link } from "react-router-dom";
// import {getRecentPrivates } from "./actions";

export default function Private({ id, first }) {
    // const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const privateMessage = useSelector(
        (state) => state.private && state.private
    );
    const elemRef = useRef();
    const pm = useSelector((state) => state.pm && state.pm);

    useEffect(() => {
        if (id && !show) {
            socket.emit("get recent private messages", {
                id: id,
            });
            setShow(true);
        }

        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, [pm, id]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("my private message", {
                message: e.target.value,
                recipient_id: id,
            });
            e.target.value = "";
        }
    };

    return (
        <div>
            <div className="privateContainer" ref={elemRef}>
                <h4 className="chatWith">chat with {first}</h4>
                {privateMessage &&
                    privateMessage.map((privateMessage, index) => (
                        <div className="flexDiv" key={index}>
                            <Link to={`/user/${privateMessage.sender_id}`}>
                                <p className="textPrivate">
                                    {privateMessage.first_name}
                                    {"  "}
                                </p>
                            </Link>
                            <p className="privateMessage">
                                {privateMessage.message}
                            </p>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="hello!"
                className="txtarea"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}
