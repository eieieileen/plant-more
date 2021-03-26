import axios from "./axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function PlantInfo() {
    const [favorite, setFavorite] = useState(true);
    const plantInfo = useSelector(
        (state) => state.plantInfo && state.plantInfo
    );
    const filteredPlants = useSelector(
        (state) => state.favPlants && state.favPlants
    );
    //useeffect to chck if the id of the plant die ik hier laat zien overeen komt met een plant in mijn favorites

    useEffect(() => {
        console.log("favorite plants", filteredPlants);
        if (filteredPlants && plantInfo) {
            for (let i = 0; i < filteredPlants.length; i++) {
                if (filteredPlants[i].apiid == plantInfo.id) {
                    setFavorite(false);
                }
            }
        }
    }, [filteredPlants, plantInfo]);

    function handleClick(apiId, imageUrl, common_name) {
        axios
            .post("/plantInfo", {
                apiId: apiId,
                imageUrl: imageUrl,
                common_name: common_name,
            })
            .then((response) => {
                console.log("response van axios.post in plantInfo", response);
                setFavorite(false);
            })
            .catch((err) =>
                console.log("error in axios post in plantInfo", err)
            );
    }

    return (
        <div>
            <h1>plant info</h1>
            {plantInfo && (
                <div>
                    <p>{plantInfo.common_name}</p>
                    <img src={plantInfo.image_url}></img>
                    {favorite && (
                        <button
                            onClick={() =>
                                handleClick(
                                    plantInfo.id,
                                    plantInfo.image_url,
                                    plantInfo.common_name
                                )
                            }
                        >
                            FAVORITE
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
