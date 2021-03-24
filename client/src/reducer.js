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
            friendsWannabes: state.friendsWannabes.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    } else if (action.type === "UNFRIEND_FRIEND") {
        state = {
            ...state,
            accepted: false,
            friendsWannabes: state.friendsWannabes.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: false,
                    };
                } else {
                    return friend;
                }
            }),
        };
    } else if (action.type === "MOST_RECENT_MESSAGES") {
        state = {
            ...state,
            messages: action.data,
        };
    } else if (action.type === "CHAT_MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.data],
        };
    } else if (action.type === "ONLINE_USERS") {
        state = {
            ...state,
            online: action.data,
        };
    } else if (action.type === "NEW_USER") {
        state = {
            ...state,
            online: [...state.online, action.data],
        };
    } else if (action.type === "USER_LEFT") {
        state = {
            //met filter
            ...state,
            online: state.online.filter((left) => {
                return left.id != action.data.user;
            }),
        };
    }
    return state;
}
