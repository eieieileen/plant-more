
export function reducer(state = {}, action) {
    //series of if statements:
    if (action.type === "GET_LIST") {
        state = {
            ...state,
            friendsWannabes: action.friendsList,
        };
    }

    if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            accept_friend_request: state.friendsWannabes.map(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accept_friend_request: action.type == "ACCEPT_FRIEND"
                    };
                }  else {
                    return friend;
                }
            })
        };
    }

    // if (action.type === "UNFRIEND_FRIEND") {
    //     state = {
    //         ...state,
    //         unfriend_friend: 
    //     };
    // }

    //last thing we want to do is return the new state
    return state;
}

