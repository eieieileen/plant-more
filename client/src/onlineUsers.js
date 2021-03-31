import { useSelector } from "react-redux";
import Private from "./private";
import { useState } from "react";
import "./onlineUsers.css";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state.online && state.online);
    const [modal, setModal] = useState(false);


    function handleClick(id) {
        console.log("clicked on the image so it should pop up a modal eventually");
        if (modal == false) {
            setModal(id);
        } else {
            setModal(false);
        }
    }


    return (
        <div className="onlineUsersContainer">
            <h3>online users</h3>
            {onlineUsers &&
                onlineUsers.map((online, index) => (
                    <div className="onlineUserDiv" key={index}>
                        <div className="onlineInfo">
                            <img
                                onClick={() => handleClick(online.id)}
                                className="chatImg"
                                src={online.imageurl || "/default.jpg"}
                            ></img>
                            <p>
                                {online.first_name} {online.last_name}
                            </p>
                        </div>
                        <div className="modal">
                            {modal == online.id && (
                                <Private
                                    first={online.first_name}
                                    id={online.id}
                                />
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}
