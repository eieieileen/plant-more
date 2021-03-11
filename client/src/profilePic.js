

//should look like profile pic.js
export default function profilePic({first_name, last_name, imageUrl, toggleUploader}) {
    //console.log("props being passes down from App: ", props)

    imageUrl = imageUrl || "taco.jpg"; //default .png is in the public folder van andrea

    return(
        <div>
            
            <h3>My name is {first_name} and my last name is {last_name}</h3>

            <img className="profile-pic" onClick={toggleUploader} src={imageUrl} alt={first_name && last_name} />
        </div>
    ) ;
    
}