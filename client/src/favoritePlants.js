import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritePlants, getOfferedPlants } from "./actions";

export default function favoritePlants() {
    const dispatch = useDispatch();
    const [plantsFavorite, setPlantsFavorite] = useState();
    const offeredPlants = useSelector((state) => state.offPlants && state.offPlants);
    const favoritePlants = useSelector((state) => state.favPlants && state.favPlants);
    //use effect om alle favoriete planten uit de db te halen
    //zodat je die dan kan renderen op screen
    //en in redux te zetten

    useEffect(() => {
        dispatch(getFavoritePlants());
        dispatch(getOfferedPlants());
    }, []);

    return (
        <div> 
            {offeredPlants && offeredPlants.map((off, index) => (
                <div key={index}>
                    <h1>is this work</h1>
                    <img src={off.imageurl}></img>
                    <p>
                        {off.common_name}
                    </p>
                </div>    
            ))};

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
