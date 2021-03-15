import { useState, useEffect } from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

export default function findPeople() {
    const [searchTerm, setSearchTerm] = useState("");
    const [resultUsers, setResultUsers] = useState();

    useEffect(() => {
        if (searchTerm) {
            axios.get("/search/users/" + searchTerm).then(({ data }) => {
                console.log("response van console.log", data);
                setResultUsers(data);
            });
        } else {
            axios.get("/users/most-recent").then(({ data }) => {
                console.log("data van de notes", data);
                setResultUsers(data);
            });
        }
    }, [searchTerm]);

    return (
        <>
            {resultUsers &&
                resultUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>
                                <Link to={`/user/${user.id}`}>
                                    {" "}
                                    {user.first_name} {user.last_name}{" "}
                                </Link>
                            </p>
                        </div>
                    );
                })}

            
           

            <input
                //defaultValue={searchTerm}
                onChange={({ target }) => {
                    setSearchTerm(target.value);
                }}
            ></input>
        </>
    );
}
