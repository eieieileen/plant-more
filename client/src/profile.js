import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import FavoritePlants from "./favoritePlants";
import "./profile.css";

export default function Profile({
    first_name,
    last_name,
    imageUrl,
    bio,
    toggleUploader,
    editBio,
    id,
}) {
    function deleteClick() {
        dispatch(deleteOffered());
        console.log("i want to delete the offered plant");
    }

    return (
        <div className="profilePage">
            <div className="bioPicClass">
                <h2>
                    welcome {first_name} {last_name}
                </h2>
                <ProfilePic
                    imageUrl={imageUrl}
                    toggleUploader={toggleUploader}
                    classN="bioPic"
                />
                <BioEditor bio={bio} editBio={(arg) => editBio(arg)} />
            </div>
            <div className="gridPlants">
                <FavoritePlants deleteClick={deleteClick} id={id} />
            </div>
            
        </div>
    );
}
