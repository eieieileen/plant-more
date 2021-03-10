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

    render() {
        return (
            <div>
                <h2>HI EILEEN THIS IS UPLOADER COMPONENT</h2>
                <h2 onClick={() => this.methodInUploader()}>Click here to run a method in uploader</h2>
            </div>
        );
    }
}