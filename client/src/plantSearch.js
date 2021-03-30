import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import { getApi, getPlantInfo } from "./actions";
import { Link } from "react-router-dom";
import "./plantSearch.css";

export default function plantSearch() {
    const dispatch = useDispatch();
    const plants = useSelector((state) => state.plants && state.plants);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch(getApi(e.target.value));
        }
    };

    return (
        <div className="outerPlantSearchContainer">
            <h1>look for your favourite plants</h1>
            <input onKeyDown={keyCheck}></input>
            <div className="plantSearchContainer">
                {plants &&
                    plants.map((plants, index) => (
                        <div className="plantSearchDiv" key={index}>
                            <Link
                                onClick={() =>
                                    dispatch(getPlantInfo(plants.id))
                                }
                                to={`/plantinfo`}
                            >
                                <Avatar
                                    alt={plants.common_name}
                                    src={
                                        plants.image_url ||
                                        "./plant-registration.jpeg"
                                    }
                                ></Avatar>
                                <p>
                                    {plants.common_name ||
                                        plants.scientific_name}{" "}
                                </p>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}
