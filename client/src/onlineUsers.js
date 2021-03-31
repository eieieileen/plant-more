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
                    <div key={index}>
                        <img
                            onClick={() => handleClick(online.id)}
                            className="chatImg"
                            src={online.imageurl || "/default.jpg"}
                        ></img>
                        <p>
                            {online.first_name} {online.last_name}
                        </p>
                        {modal == online.id && <Private id={online.id} />}
                    </div>
                ))}
        </div>
    );
}
