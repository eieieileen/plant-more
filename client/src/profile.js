import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile({
    // first_name,
    // last_name,
    imageUrl,
    bio,
    toggleUploader,
    // classN,
    editBio,
}) {
    return (
        <div>
            <ProfilePic
                imageUrl={imageUrl}
                toggleUploader={toggleUploader}
                classN="bioPic"
            />
            <BioEditor bio={bio} editBio={(arg) => editBio(arg)} />
        </div>
    );
}