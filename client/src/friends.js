import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, acceptFriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveUsers());
    }, []);

    const friend = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((friend) => friend.accepted == true)
    );
    const wannabe = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((wannabe) => wannabe.accepted == false)
    );

    if (!friend && !wannabe) {
        return null;
    }

    return (
        <div>
            <h1>HI EILEEN THIS IS FRIENDS</h1>
            {friend.map((friend, index) => (
                <div key={index}>
                    <p>
                        {friend.first_name} {friend.last_name}
                        <img src={friend.imageurl}></img>
                    </p>
                </div>
            ))}
            {wannabe.map((friend, index) => (
                <div key={index}>
                    <p>
                        {friend.first_name} {friend.last_name}
                        <img src={friend.imageurl}></img>
                    </p>
                    <button onClick={() => dispatch(acceptFriend(friend.id))}>
                        ACCEPT
                    </button>
                </div>
            ))}
        </div>
    );
}
