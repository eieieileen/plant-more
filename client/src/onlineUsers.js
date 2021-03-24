import { useSelector } from "react-redux";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state.online && state.online);
    //const joined = useSelector((state) => state.joined && state.joined);
    return (
        <>
            <h3>ONLINE TACO&apos;S</h3>
            {onlineUsers &&
                onlineUsers.map((online, index) => (
                    <div key={index}>
                        <p>
                            {online.first_name} {online.last_name}
                            <img
                                className="chatImg"
                                src={online.imageurl}
                            ></img>
                        </p>
                    </div>
                ))}
            {/* {joined && joined.map((joined, index) => (
                <div key={index}>
                    <p>
                        {joined.first_name} {joined.last_name}
                        <img src={joined.imageurl}></img>
                    </p>
                </div>
            ))}     */}
        </>
    );
}
