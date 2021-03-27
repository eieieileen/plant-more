import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritePlants, getOfferedPlants, getPlantInfo } from "./actions";
import { Link } from "react-router-dom";
import "./favoritePlants.css";

export default function favoritePlants() {
    const dispatch = useDispatch();
    const [plantsFavorite, setPlantsFavorite] = useState();
    const offeredPlants = useSelector(
        (state) => state.offPlants && state.offPlants
    );
    const favoritePlants = useSelector(
        (state) => state.favPlants && state.favPlants
    );
    //use effect om alle favoriete planten uit de db te halen
    //zodat je die dan kan renderen op screen
    //en in redux te zetten

    useEffect(() => {
        dispatch(getFavoritePlants());
        dispatch(getOfferedPlants());
    }, []);

    return (
        <div>
            <div className="favoritePlants">
                <h3>your wishlist</h3>
                {favoritePlants &&
                    favoritePlants.map((fav, index) => (
                        <div key={index}>
                            <div>
                                <Link 
                                    onClick={() =>
                                        dispatch(getPlantInfo(fav.apiid))
                                    }
                                    to={`/plantinfo`}
                                >
                                    <img
                                        className="favPlants"
                                        src={fav.imageurl}
                                    ></img>
                                    <p>{fav.common_name}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="offeredPlants">
                <h3>plants that you offer</h3>
                {offeredPlants &&
                    offeredPlants.map((off, index) => (
                        <div key={index}>
                            <div>
                                <img
                                    className="offPlants"
                                    src={off.ownimage}
                                ></img>
                                <p>{off.common_name}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
