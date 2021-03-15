import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import Footer from "./footer";

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
            <div>
                <ProfilePic
                    imageUrl={imageUrl}
                    toggleUploader={toggleUploader}
                    classN="bioPic"
                />
            </div>

            <BioEditor bio={bio} editBio={(arg) => editBio(arg)} />
            <Footer />
        </div>
    );
}
