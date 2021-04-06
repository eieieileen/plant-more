import axios from "./axios";
import { useState } from "react";
import "./plantUploader.css";

export default function PlantUploader({
    apiId,
    imageurl,
    common_name,
    setAvailableButton,
}) {
    const [inputFields, setInputFields] = useState({
        apiId: apiId,
        imageurl: imageurl,
        common_name: common_name,
    });

    function handleClick() {
        const formData = new FormData();
        formData.append("apiId", inputFields.apiId);
        formData.append("imageurl", inputFields.imageurl);
        formData.append("common_name", inputFields.common_name);
        formData.append("name", inputFields.name);
        formData.append("note", inputFields.note);
        formData.append("number", inputFields.number);
        formData.append("location", inputFields.location);
        formData.append("file", inputFields.image);
        axios
            .post(`/sendPlantUploader`, formData)
            .then((response) => {
                console.log("response van axios.post", response);
                setAvailableButton(false);
            })
            .catch((err) =>
                console.log("error in axios.post sendPlantUploader", err)
            );
    }

    function handleChange(e) {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    }

    function fileChange(e) {
        setInputFields({ ...inputFields, image: e.target.files[0] });
    }

    return (
        <div className="plantUploaderContainer">
            <div className="plantUploader">
                <form>
                    <label>
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="name"
                            placeholder="name"
                        />
                        <input
                            onChange={(e) => handleChange(e)}
                            type="number"
                            name="number"
                            placeholder="age"
                        />
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="note"
                            placeholder="tell a little more about the plant"
                        />
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="location"
                            placeholder="location"
                        />
                        <input
                            onChange={(e) => fileChange(e)}
                            type="file"
                            name="ownImage"
                            accept="image/*"
                        />
                    </label>
                </form>
                <button className="buttonPlantUploader" onClick={() => handleClick()}>submit</button>
            </div>
        </div>
    );
}
