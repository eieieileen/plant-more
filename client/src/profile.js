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
}) {
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
            <FavoritePlants />
        </div>
    );
}
