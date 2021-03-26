import { useSelector, useDispatch } from "react-redux";
import { Container, Avatar } from "@material-ui/core";
import { getApi, getPlantInfo } from "./actions";
import { Link } from "react-router-dom";

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
        <Container maxWidth="sm">
            {plants &&
                plants.map((plants, index) => (
                    <div key={index}>
                        <Link onClick={() => dispatch(getPlantInfo(plants.id))} to={`/plantinfo`} >
                            <p>{plants.common_name}</p>
                            <Avatar
                                alt={plants.common_name}
                                src={plants.image_url}
                            ></Avatar>
                        </Link>
                    </div>
                ))}
            <input onKeyDown={keyCheck}></input>
        </Container>
    );
}
