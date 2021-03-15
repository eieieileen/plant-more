import { useState, useEffect } from "react";
import axios from "./axios";

export default function findPeople() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();

    useEffect(() => {
        axios.get("/users/most-recent").then(({ data }) => {
            console.log("data van de notes", data);
            setResultUsers(data);
        });
    }, []);
    
    return (
        <>
            {resultUsers && resultUsers.map((user) => {
                return (
                    <div key={user.id}>
                        <p> {user.first_name} </p>
                    </div>
                );
            })}
            <input></input>

        </>
    );
}
