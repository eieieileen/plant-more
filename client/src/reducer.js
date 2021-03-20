
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
            accepted: true,
            friendsWannabes: state.friendsWannabes.map(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        friendsWannabes: action.type == "ACCEPT_FRIEND"
                    };
                }  else {
                    return friend;
                }
            })
        };
    } else if (action.type === "UNFRIEND_FRIEND") {
        state = {
            ...state,
            accepted: false,
            friendsWannabes: state.friendsWannabes.filter(friend => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        friendsWannabes: action.type =="DECLINE_FRIEND"
                    };
                } else {
                    return friend;
                }
            })
        };
    }
    return state;
}

