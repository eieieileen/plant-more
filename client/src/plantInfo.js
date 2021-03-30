import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PlantUploader from "./plantUploader";
import { findOffers } from "./actions";
import { Link } from "react-router-dom";

export default function PlantInfo() {
    const [favorite, setFavorite] = useState(true);
    const [availableButton, setAvailableButton] = useState(false);
    const dispatch = useDispatch();
    // usestate gebruiken om visible-setVisible true of false te zettenXX
    // button set  visible - true

    const plantInfo = useSelector(
        (state) => state.plantInfo && state.plantInfo
    );
    const filteredPlants = useSelector(
        (state) => state.favPlants && state.favPlants
    );

    const offeredPlants = useSelector(
        (state) => state.getOffers && state.getOffers
    );

    useEffect(() => {
        if (plantInfo) {
            dispatch(findOffers(plantInfo.main_species_id));
        }
        //console.log("favorite plants", filteredPlants);
        if (filteredPlants && plantInfo) {
            for (let i = 0; i < filteredPlants.length; i++) {
                if (filteredPlants[i].apiid == plantInfo.id) {
                    setFavorite(false);
                }
            }
        }
    }, [plantInfo]);

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

    function availableClick() {
        console.log("i clicked the availebutton");
        setAvailableButton(!availableButton);
    }

   
    //plantuploader

    return (
        <div>
            <h1>plant info</h1>
            {plantInfo && (
                <div>
                    <p>{plantInfo.common_name} </p>
                    <img src={plantInfo.image_url || "/default.jpg"}></img>
                    {favorite && (
                        <button
                            onClick={() =>
                                handleClick(
                                    plantInfo.main_species_id,
                                    plantInfo.image_url,
                                    plantInfo.common_name
                                )
                            }
                        >
                            wishlist
                        </button>
                    )}
                    <button onClick={() => availableClick()}>available</button>
                    {availableButton && (
                        <PlantUploader
                            setAvailableButton={setAvailableButton}
                            common_name={plantInfo.common_name}
                            imageurl={plantInfo.image_url}
                            apiId={plantInfo.main_species_id}
                        />
                    )}
                   
                </div>
            )}
            {offeredPlants &&
                offeredPlants.map((plant, index) => (
                    <div key={index}>
                        <Link to={`/user/${plant.userid}`}>
                            <h1>{plant.nick_name}</h1>
                            <img src={plant.ownimage}></img>
                        </Link>
                    </div>
                ))}
        </div>
    );
}
