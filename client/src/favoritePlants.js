import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritePlants, getOfferedPlants, getPlantInfo } from "./actions";
import { Link } from "react-router-dom";
import "./favoritePlants.css";

export default function favoritePlants({
    id,
    deleteClick,
    deleteClickNumTwo,
    location,
}) {
    const dispatch = useDispatch();
    const offeredPlants = useSelector(
        (state) => state.offPlants && state.offPlants
    );
    const favoritePlants = useSelector(
        (state) => state.favPlants && state.favPlants
    );

    useEffect(() => {
        console.log(id);
        dispatch(getFavoritePlants(id));
        dispatch(getOfferedPlants(id));
        console.log("helllo");
    }, [id]);

    return (
        <div className="favoritePlantsContainer">
            <h3 className="wishlist">wishlist</h3>
            <div className="favoritePlants">
                {favoritePlants &&
                    favoritePlants.map((fav, index) => (
                        <div key={index}>
                            <Link
                                onClick={() =>
                                    dispatch(getPlantInfo(fav.apiid))
                                }
                                to={`/plantinfo`}
                            >
                                <div className="common_name">
                                    <img
                                        className="favPlants"
                                        src={fav.imageurl}
                                    ></img>
                                    <p>
                                        {fav.common_name || fav.scientific_name}
                                    </p>
                                </div>
                            </Link>

                            <div className="buttonWishlist">
                                {location && (
                                    <button
                                        className="button"
                                        onClick={() => deleteClick(fav.id)}
                                    >
                                        delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
            <h3 className="offeredPlants">offered plants</h3>
            <div className="offeredPlants">
                {offeredPlants &&
                    offeredPlants.map((off, index) => (
                        <div key={index}>
                            <Link
                                onClick={() =>
                                    dispatch(getPlantInfo(off.apiid))
                                }
                                to={`/plantinfo`}
                            >
                                <div className="common_name">
                                    <img
                                        className="favPlants"
                                        src={off.ownimage || off.imageurl}
                                    ></img>
                                    <p>
                                        {off.nick_name ||
                                            off.common_name ||
                                            off.scientific_name}
                                    </p>
                                </div>
                            </Link>
                            <div className="buttonOfferedPlants">
                                {location && (
                                    <button
                                        className="button"
                                        onClick={() =>
                                            deleteClickNumTwo(off.id)
                                        }
                                    >
                                        delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
