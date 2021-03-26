import { useSelector } from "react-redux";

export default function plantInfo() {
    const plantInfo = useSelector((state) => state.plantInfo && state.plantInfo);
    
    //in use effect een axios request for a get route, gewoon naar een api. 
    //met de link uit plantsearch wat er achter aan staat
    //response en dat is alle info van de plant

    return(
        <div>
            <h1>HI EILEEN THIS IS PLANTINFO</h1>
            {plantInfo && (
                <div>
                    <p>{plantInfo.common_name}</p>
                    <img src={plantInfo.image_url}></img>
                </div>
            )}
        </div>
    );
}