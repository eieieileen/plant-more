import { useSelector } from "react-redux";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state.online && state.online);
    //const joined = useSelector((state) => state.joined && state.joined);
    return (
        <div className="OUdiv">
            <h3>ONLINE TACO&apos;S</h3>
            {onlineUsers &&
                onlineUsers.map((online, index) => (
                    <div key={index}>
                        <img className="chatImgOU" src={online.imageurl || "/default.jpg"}></img>
                        <p>
                            {online.first_name} {online.last_name}
                        </p>
                    </div>
                ))}
        </div>
    );
}
