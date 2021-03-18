import axios from "./axios";

export async function receiveUsers() {
    const { data } = await axios.get("/get-friends");
    return {
        type: "GET_LIST",
        friendsList: data, //aka data instead of friendsList
    };
}

