import axios from "./axios";
import { useState } from "react";

export default function PlantUploader({ apiId, imageurl, common_name }) {
    //use state gebruiken om object
    const [inputFields, setInputFields] = useState({
        apiId: apiId,
        imageurl: imageurl,
        common_name: common_name,
    });

    function handleClick() {
        console.log("i clicked the button");
        axios
            .post(`/sendPlantUploader`, inputFields)
            .then((response) => {
                console.log("response van axios.post", response);
            })
            .catch((err) =>
                console.log("error in axios.post sendPlantUploader", err)
            );
    }

    function handleChange(e) {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value });
        //console.log("invoeren van inputfields", e.target.value);
        console.log("inputfields", inputFields);
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
