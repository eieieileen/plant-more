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
        console.log("clickieclick!!!");
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
            <div id="uploader">
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
                {/* <h2>HI EILEEN THIS IS UPLOADER COMPONENT</h2> */}
            </div>
        );
    }
}
