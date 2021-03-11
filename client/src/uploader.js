import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log("props in uploader: ", props);
    }

    componentDidMount() {
        console.log("uploader mounted!!!!");
    }

    methodInUploader() {
        this.props.methodInApp("whoaaa this is cool!");
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
        console.log("clickieclick!!!");
        axios.post("/picUpload", formData).then(() => {

        }).catch((err) => console.log("error in axios post picUpload 🐙", err));
    }

    render() {
        return (
            <div>
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
                <h2>HI EILEEN THIS IS UPLOADER COMPONENT</h2>
                <h2 onClick={() => this.methodInUploader()}>
                    Click here to run a method in uploader
                </h2>
            </div>
        );
    }
}