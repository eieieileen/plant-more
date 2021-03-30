import { useDispatch } from "react-redux";
import { deleteWishlist, deleteOffered } from "./actions";
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
    const dispatch = useDispatch();



    function deleteClick(id) { 
        dispatch(deleteWishlist(id));
        console.log("i want to delete the offered plant");
    }

    function deleteClickNumTwo(id) {
        dispatch(deleteOffered(id));
        console.log("clicked delete button num 2");
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
                <FavoritePlants deleteClick={deleteClick} deleteClickNumTwo={deleteClickNumTwo} id={id} />
            </div>
            
        </div>
    );
}
