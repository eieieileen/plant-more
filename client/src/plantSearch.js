import { useSelector, useDispatch } from "react-redux";
//import { useEffect } from "react";
import { Container, Avatar, Badge } from "@material-ui/core";
import { getApi } from "./actions";

export default function plantSearch() {
    const dispatch = useDispatch();
    const plants = useSelector((state) => state.plants && state.plants);

    const keyCheck = (e) => {
        //only really care about the value, when i press enter
        if (e.key === "Enter") {
            e.preventDefault(); //this will stop the new line :D
            console.log("e.target.value: ", e.target.value);
            dispatch(getApi(e.target.value));
        }
    };

    return (
        <Container maxWidth="sm">
            <h1>HI EILEEN THIS IS PLANTSEARCH</h1>

            {plants &&
                plants.map((plants, index) => (
                    <div key={index}>
                        <p>{plants.common_name}</p>
                        <Avatar
                            alt={plants.common_name}
                            src={plants.image_url}
                        ></Avatar>
                        {/* <img src={plants.image_url}></img> */}
                    </div>
                ))}

            <input onKeyDown={keyCheck}></input>
        </Container>
    );
}
