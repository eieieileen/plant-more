export function reducer(state ={ private: [{}] }, action) {
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
    } else if (action.type === "GET_PLANTS") {
        state = {
            ...state,
            plants: action.dataFromPlants,
        };
    } else if (action.type === "GET_PLANT_INFO") {
        state = {
            ...state,
            plantInfo: action.dataFromPlantsInfo,
        };
    } else if (action.type === "FAVORITE_PLANTS") {
        state = {
            ...state,
            favPlants: action.dataFromFavoritePlants,
        };
    } else if (action.type === "OFFERED_PLANTS") {
        state = {
            ...state,
            offPlants: action.dataFromOfferedPlants,
        };
    } else if (action.type === "SEE_OFFERS") {
        state = {
            ...state,
            getOffers: action.dataFromSeeOffers,
        };
    } else if (action.type === "PRIVATE_MESSAGES") {
        state = {
            ...state,
            private: [...state.private, action.data],
        };

    }
    return state;
}
