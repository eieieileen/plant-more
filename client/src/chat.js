import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    //chatMessages will be undefined at first once it is hooked up properly with redux, it should be an array of chat messages.
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state.messages);
    console.log("chatMessages ivana: ", chatMessages);

    useEffect(() => {
        console.log("chat mounted..");
        console.log("elemRef.current: ", elemRef.current);
        console.log("elemRef.current scrollTop: ", elemRef.current.scrollTop);
        console.log(
            "elemRef.current scrollHeight: ",
            elemRef.current.scrollHeight
        );
        console.log(
            "elemRef.current clientHeight ",
            elemRef.current.clientHeight
        );

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
        <>
            <h1>Chat room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map((chatMessages, index) => (
                        <div key={index}>
                            <p>
                                {chatMessages.first_name}{" "}
                                {chatMessages.last_name}: {chatMessages.message}{" "}
                                - {chatMessages.created_at}{" "}
                            </p>
                            <img
                                className="chatImg"
                                src={chatMessages.imageurl}
                            ></img>
                        </div>
                    ))}
                <textarea id="chatArea"
                    placeholder="TELL YOUR LOVE ABOUT TACO'S HERE"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </>
    );
}
