import { Component } from "react";
import axios from "./axios";
import "./uploader.css";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log("props in uploader: ", props);
    }

    componentDidMount() {
        console.log("uploader mounted!!!!");
    }

    methodInUploader(imageUrl) {
        this.props.methodInApp(imageUrl);
    }

    handleChange(e) {
        this.setState(
            {
                image: e.target.files[0],
            },
            () => console.log("this.state after setState:", e.target.files[0])
        );
    }

    handleClick() {
        const formData = new FormData();
        formData.append("file", this.state.image);
        //console.log("clickieclick!!!");
        axios
            .post("/picUpload", formData)
            .then(({ data }) => {
                console.log("response van axios post picca uploadda", data);
                this.methodInUploader(data.url);
                this.props.toggleUploader();
            })
            .catch((err) =>
                console.log("error in axios post picUpload 🐙", err)
            );
    }

    render() {
        return (
            <div className="uploaderContainer">
                <div className="uploader">
                    <h1>UPLOAD PROFILE PICTURE</h1>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="file"
                        name="uploadImg"
                        accept="image/*"
                    />
                    <button
                        className="submitButton"
                        onClick={() => this.handleClick()}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        );
    }
}
