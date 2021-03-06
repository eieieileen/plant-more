import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PlantUploader from "./plantUploader";
import { findOffers } from "./actions";
import { Link } from "react-router-dom";
import "./plantInfo.css";

export default function PlantInfo() {
    const [favorite, setFavorite] = useState(true);
    const [availableButton, setAvailableButton] = useState(false);
    const dispatch = useDispatch();

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

    return (
        <div className="plantInfoContainer">
            {plantInfo && (
                <div className="plantInfoFlex">
                    <h1 className="plantInfoCN">
                        {plantInfo.common_name || plantInfo.scientific_name}
                    </h1>
                    <img
                        className="plantInfoImg"
                        src={plantInfo.image_url || "/default2.png"}
                    ></img>
                    {favorite && (
                        <button
                            className="buttonWish"
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
                    <button
                        className="buttonAvailable"
                        onClick={() => availableClick()}
                    >
                        available
                    </button>
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
            <div>
                {offeredPlants && <h1>available plants</h1>}
                {offeredPlants &&
                    offeredPlants.map((plant, index) => (
                        <div className="offeredPlantsName" key={index}>
                            <Link to={`/user/${plant.userid}`}>
                                <h4>{plant.nick_name}</h4>
                                <img
                                    className="offeredPlantsImg"
                                    src={plant.ownimage}
                                ></img>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}
