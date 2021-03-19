import axios from "./axios";

export async function receiveUsers() {
    const { data } = await axios.get("/get-friends");
    return {
        type: "GET_LIST",
        friendsList: data, //aka data instead of friendsList
    };
}

export async function acceptFriend(id) {
    await axios.post(`/accept-friend/${id}`);
    return {
        type: "ACCEPT_FRIEND",
        id: id
    };
}

export async function unfriend(id) {
    await axios.post(`unfriend-friend/${id}`);
    return {
        TYPE: "UNFRIEND_FRIEND",
        id: id,
    };
}

