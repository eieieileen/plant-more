import axios from "./axios";
import { useState } from "react";
import "./plantUploader.css";

export default function PlantUploader({ apiId, imageurl, common_name, setAvailableButton }) {
    //use state gebruiken om object
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
        //console.log("formdata", formData);
        // console.log("inputfields", inputFields);
        // console.log("i clicked the button");
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
        //console.log("invoeren van inputfields", e.target.value);
        //console.log("inputfields", inputFields);
    }

    function fileChange(e) {
        setInputFields({ ...inputFields, image: e.target.files[0] });
        //console.log("target file", e.target.files[0]);
    }

    return (
        <div>
            <h1>HI EILEEN THIS IS PLANT plantUploader</h1>
            <form>
                <label>
                    {/* e target value en file handlen naar s3 */}
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
            <button onClick={() => handleClick()}>submit</button>
        </div>
    );
}
//input field voor notitie, leeftijd,XX ownimageXX, locatieXX, nameXX
