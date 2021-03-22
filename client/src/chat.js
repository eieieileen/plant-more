import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    //chatMessages will be undefined at first once it is hooked up properly with redux, it should be an array of chat messages.
    const chatMessages = useSelector((state) => state.chatMessages && state.chatMessages);
    console.log("chatMessages: ", chatMessages);

    const elemRef = useRef();

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
    }, []);

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
                {/* {chatMessages.map((chatMessages, index) => (
                    <div key={index}>
                        <p>
                            {chatMessages.first_name} 
                        </p>
                    </div>    
                ))} */}

                {/* <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p>
                <p>Chat messages will go here!</p> */}
            </div>
            <textarea
                placeholder="add your message here!"
                onKeyDown={keyCheck}
            ></textarea>
        </>
    );
}
