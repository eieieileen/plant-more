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
    await axios.post(`/accept-friend`, { otherUser: id });
    return {
        type: "ACCEPT_FRIEND",
        id: id,
    };
}

export async function unfriend(id) {
    await axios.post(`/unfriend-friend`, { otherUser: id });
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

export async function chatBericht(msg) {
    return {
        type: "CHAT_MESSAGE",
        data: msg,
    };
}

export async function onlineUser(onlineUsers) {
    return {
        type: "ONLINE_USERS",
        data: onlineUsers,
    };
}

export async function userJoined(newUser) {
    return {
        type: "NEW_USER",
        data: newUser,
    };
}

export async function userLeft(userLeft) {
    return {
        type: "USER_LEFT",
        data: userLeft,
    };
}

export async function getApi(search) {
    const { data } = await axios.get(`/trefleApi/${search}`);
    //console.log("data van getApi", data.data);
    return {
        type: "GET_PLANTS",
        dataFromPlants: data.data,
    };
}

export async function getPlantInfo(plantid) {
    console.log("plantid", plantid);
    const { data } = await axios.get(`/api/plantInfo/${plantid}`);
    //console.log("data van getPlantInfo", data.data);
    return {
        type: "GET_PLANT_INFO",
        dataFromPlantsInfo: data.data,
    };
}

export async function getFavoritePlants(id) {
    const { data } = await axios.get(`/getFavoritePlants/${id}`);
    //console.log("data", data);
    return {
        type: "FAVORITE_PLANTS",
        dataFromFavoritePlants: data,
    };
}

export async function getOfferedPlants(id) {
    const { data } = await axios.get(`/getOfferedPlants/${id}`);
    //console.log("data van getOfferedPlants", data);
    return {
        type: "OFFERED_PLANTS",
        dataFromOfferedPlants: data,
    };
}

export async function findOffers(apiid) {
    const { data } = await axios.get(`/seeOfferedPlants/${apiid}`);
    console.log("data uit action seeOfferedPlants", data);
    return {
        type: "SEE_OFFERS",
        dataFromSeeOffers: data,
    };
}

export async function privateMessage(message) {
    return {
        type: "PRIVATE_MESSAGES",
        data: message,
    };
}

export async function deleteWishlist(id) {
    const { data } = await axios.post(`/deleteWishlistPlants`, { id: id });
    console.log("data van axios post deleteOffered", data);
    return {
        type: "DELETE_WISHED_PLANTS",
        data: id,
    };
}

export async function deleteOffered(id) {
    const { data } = await axios.post(`/deleteOfferedPlants`, { id: id });
    console.log("data van axios post deleteAvailable", data);
    return {
        type: "DELETE_AVAILABLE_PLANTS",
        data: id,
    };
}
