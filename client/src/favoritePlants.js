import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritePlants, getOfferedPlants, getPlantInfo } from "./actions";
import { Link } from "react-router-dom";
import "./favoritePlants.css";

export default function favoritePlants({ id, deleteClick }) {
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
        <div>
            <div className="favoritePlants">
                <h3>wishlist</h3>
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
                                    <div className="common_name">
                                        <img
                                            className="favPlants"
                                            src={fav.imageurl}
                                        ></img>
                                        <p>
                                            {fav.common_name ||
                                                fav.scientific_name}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <button onClick={() => deleteClick(fav.id)}>
                                delete
                            </button>
                        </div>
                    ))}
            </div>
            <div className="offeredPlants">
                <h3>offered plants</h3>
                {offeredPlants &&
                    offeredPlants.map((off, index) => (
                        <div key={index}>
                            <div className="common_name">
                                <img
                                    className="offPlants"
                                    src={off.ownimage || off.imageurl}
                                ></img>
                                <p>
                                    {off.nick_name ||
                                        off.common_name ||
                                        off.scientific_name}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
