import { Component } from "react";
import Presentational from "./presentational";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "Morrissey",
            last: "Pennings",
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App mounted");
        //here is where we want to make an axios request to "get"  info about the logged in user (first name, last name, profile picture)
        // a good route for our axios would be /user
        //once you have the info from the server, add this information to the state of the component
        //you can do this by using a method called setState
    }

    methodInApp(arg) {
        console.log("method in App is running - the Argument passed to it is: ", arg);
    }

    toggleUploader() {
        console.log("toggleUploader is running!");

        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            <div>
                <h1> HI EILEEN THIS IS APP</h1>
                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                />
                <h2 onClick={() => this.toggleUploader()}>Toggling uploader visibility</h2>

                {this.state.uploaderIsVisible && <Uploader methodInApp={this.methodInApp} />}
            </div>
        );
    }
}
