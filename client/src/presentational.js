//should look like profile pic.js
export default function Presentational(props) {
    //console.log("props being passes down from App: ", props)

    imageUrl = imageUrl || "taco.jpg"; //default .png is in the public folder van andrea

    return(
        <div>
            <h2>THIS IS A PRESENTATIONAL COMPONENT!</h2>;
            <h3>My name is {props.first} and my last name is {props.last}</h3>

            <img className="profile-pic" src={props.imageUrl} alt={props.first && props.last} />
        </div>
    ) ;
    
}