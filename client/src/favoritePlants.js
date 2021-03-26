import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritePlants } from "./actions";

export default function favoritePlants() {
    const dispatch = useDispatch();
    const [plantsFavorite, setPlantsFavorite] = useState();
    const favoritePlants = useSelector((state) => state.favPlants && state.favPlants);
    //use effect om alle favoriete planten uit de db te halen
    //zodat je die dan kan renderen op screen
    //en in redux te zetten

    //useSelector
    useEffect(() => {
        dispatch(getFavoritePlants());
    }, []);

    return (
        <div> 
            {favoritePlants && favoritePlants.map((fav, index) => (
                <div key={index}>
                    <img src={fav.imageurl}></img>
                    <p>
                        {fav.common_name}
                    </p>
                </div>
            ))}
            <h1>HI EILEEN THIS IS FAVORITE PLANTS</h1>
        </div>
    );
}
