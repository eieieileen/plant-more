import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, acceptFriend, unfriend } from "./actions";

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
        <div className="friendsFlex">
            {/* <h1>HI EILEEN THIS IS FRIENDS</h1> */}
            {friend.map((friend, index) => (
                <div className="requestDiv" key={index}>
                    <img className="requestImg" src={friend.imageurl}></img>
                    <p className="requestName">
                        {friend.first_name} {friend.last_name}
                    </p>
                    <button
                        className="friendsButton"
                        onClick={() => dispatch(unfriend(friend.id))}
                    >
                        UNFRIEND
                    </button>
                </div>
            ))}
            {wannabe.map((friend, index) => (
                <div className="requestDiv" key={index}>
                    <img className="requestImg" src={friend.imageurl}></img>
                    <p className="requestName">
                        {friend.first_name} {friend.last_name}
                    </p>
                    <button
                        className="friendsButton"
                        onClick={() => dispatch(acceptFriend(friend.id))}
                    >
                        ACCEPT
                    </button>
                </div>
            ))}
        </div>
    );
}
