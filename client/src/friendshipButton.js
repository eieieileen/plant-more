import axios from "./axios";
import { useState, useEffect } from "react";
import "./friendshipButton.css";

export default function FriendshipButton({ id }) {
    const [buttonText, setButtonText] = useState();

    function whatButtonSays(check) {
        let text = "add friend";
        console.log("check is: ", check);
        if (check.rows) {
            const { sender_id, accepted } = check.rows;
            const loggedIn = check.loggedIn;
            if (accepted) {
                text = "unfriend";
                return text;
            } else if (loggedIn == sender_id) {
                text = "cancel request";
                return text;
            } else if (accepted === false) {
                text = "accept friend";
                return text;
            } else {
                text = "add friend";
                return text;
            }
        } else {
            return text;
        }
    }

    useEffect(() => {
        axios
            .get("/addfriends/" + id)
            .then(({ data }) => {
                console.log("response van axios get:addfriends/:id", data);
                setButtonText(whatButtonSays(data));
            })
            .catch((err) =>
                console.log("error in axios.get /addfriends/:id", err)
            );
    }, [id]);


    function handleClick() {
        console.log("i clicked the friend request button yay");
        axios
            .post("/requestFriend", { action: buttonText, otherUser: id })
            .then(({data}) => {
                console.log("response van axios.post requestFriend", data);
                setButtonText(whatButtonSays(data));
            })
            .catch((err) =>
                console.log("error van axios.post requestfriend 🐧", err)
            );
    }

    return (
        <div className="friendshipContainer">
            <button className="friendship" onClick={() => handleClick()}>{buttonText}</button>
        </div>
    );
}
