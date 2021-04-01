import { socket } from "./sockets";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import "./private.css";
// import {getRecentPrivates } from "./actions";

export default function Private({ id, first }) {
    // const dispatch = useDispatch();
    const privateMessage = useSelector(
        (state) => state.private && state.private
    );
    const elemRef = useRef();
    const pm = useSelector((state) => state.pm && state.pm);

    useEffect(() => {
        //dispatch(getRecentPrivates(id));
        if (id) {
            socket.emit("get recent private messages", {
                id: id,
            });
            const newScrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
            elemRef.current.scrollTop = newScrollTop;
        }
    }, [pm, id]);

    // met useSelector de private messages overal renderen waar wil

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
                            {/* <img className="privateImg" src={privateMessage.imageurl || '/default.jpg'}></img> */}
                            <p className="textPrivate">
                                {privateMessage.first_name}
                                {"  "}
                            </p>
                            <p className="privateMessage">
                                {privateMessage.message}
                            </p>
                            {/* {privateMessage.last_name}{" "} */}
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
