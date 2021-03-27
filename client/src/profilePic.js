//should look like profile pic.js
export default function profilePic({
    first_name,
    last_name,
    imageUrl,
    toggleUploader,
    classN
}) {
    imageUrl = imageUrl || "/default.jpg"; 

    return (
        <div>
            <img
                className={classN}
                onClick={toggleUploader}
                src={imageUrl}
                alt={first_name && last_name}
            />
        </div>
    );
}
