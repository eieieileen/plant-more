import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";
import OnlineUsers from "./onlineUsers";
import "./chat.css";

export default function Chat() {
    //chatMessages will be undefined at first once it is hooked up properly with redux, it should be an array of chat messages.
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state.messages);
    //console.log("chatMessages ivana: ", chatMessages);

    useEffect(() => {
        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        //elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, [chatMessages]);

    const keyCheck = (e) => {
        //only really care about the value, when i press enter
        if (e.key === "Enter") {
            e.preventDefault(); //this will stop the new line :D
            console.log("e.target.value: ", e.target.value);
            socket.emit("my amazing chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chatFlex">
            <div className="classChat">
                <div className="chat-container" ref={elemRef}>
                    <h3>public chat</h3>
                    {chatMessages &&
                        chatMessages.map((chatMessages, index) => (
                            <div key={index}>
                                <p className="infoMessage">
                                    <img
                                        className="chatImg"
                                        src={
                                            chatMessages.imageurl ||
                                            "/default.jpg"
                                        }
                                    ></img>
                                    <p className="chatNames">
                                        {chatMessages.first_name}{" "}
                                        {chatMessages.last_name}-{" "}
                                    </p>
                                    <p className="chatBericht">{chatMessages.message} </p>
                                </p>
                            </div>
                        ))}
                </div>
                <textarea
                    className="chatArea"
                    placeholder="hello!"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
            <OnlineUsers />
            {/* <Private id={this.props.match.params.id} /> */}
        </div>
    );
}
