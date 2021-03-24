import axios from "./axios";
import { useState, useEffect } from "react";
//import OtherProfile from "./otherProfile";

export default function FriendshipButton({ id }) {
    const [buttonText, setButtonText] = useState();

    function whatButtonSays(check) {
        let text = "ADD TACO FRIEND";
        console.log("check is: ", check);
        if (check.rows) {
            const { sender_id, accepted } = check.rows;
            const loggedIn = check.loggedIn;
            if (accepted) {
                text = "UNFRIEND FRIENDLY TACO";
                return text;
            } else if (loggedIn == sender_id) {
                text = "CANCEL TACO FRIEND";
                return text;
            } else if (accepted === false) {
                text = "ACCEPT TACO'S";
                return text;
            } else {
                text = "ADD TACO FRIEND";
                return text;
            }
        } else {
            return text;
        }
    }

    useEffect(() => {
        //axios zelfde route met id, ${}, response
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
        <div>
            <button className="friendship" onClick={() => handleClick()}>{buttonText}</button>
        </div>
    );
}
