import axios from "./axios";

export async function receiveUsers() {
    const { data } = await axios.get("/get-friends");
    return {
        type: "GET_LIST",
        friendsList: data, //aka data instead of friendsList
    };
}

// await axios.post(`/accept-friend/`, {otherUser: id}); = sending a body mee op deze manier
export async function acceptFriend(id) {
    await axios.post(`/accept-friend`, {otherUser: id});
    return {
        type: "ACCEPT_FRIEND",
        id: id
    };
}

export async function unfriend(id) {
    await axios.post(`/unfriend-friend`, {otherUser:id});
    return {
        type: "UNFRIEND_FRIEND",
        id: id,
    };
}

export async function chatMessages(msgs) {
    return {
        type: "MOST_RECENT_MESSAGES",
        data: msgs,
    };
}

export async function chatBericht (msg) {
    return {
        type: "CHAT_MESSAGE",
        data: msg,
    }   ;
}

