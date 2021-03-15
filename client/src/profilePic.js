//should look like profile pic.js
export default function profilePic({
    first_name,
    last_name,
    imageUrl,
    toggleUploader,
    classN
}) {
    //console.log("props being passes down from App: ", props)

    imageUrl = imageUrl || "/taco.jpg"; //default .png is in the public folder van andrea

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
