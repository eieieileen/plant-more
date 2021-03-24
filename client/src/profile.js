import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
//import Footer from "./footer";

export default function Profile({
    first_name,
    last_name,
    imageUrl,
    bio,
    toggleUploader,
    // classN,
    editBio,
}) {
    return (
        <div className="profilePage">
            <div className="bioPicClass">
                <h2>
                    {first_name} {last_name}
                </h2>
                <ProfilePic
                    imageUrl={imageUrl}
                    toggleUploader={toggleUploader}
                    classN="bioPic"
                />
                <BioEditor bio={bio} editBio={(arg) => editBio(arg)} />
            </div>
            
        </div>
    );
}
