import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Logo from "./logo";
import axios from "./axios";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            // first: "",
            // last: "",
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App mounted!🥑");
        axios.get("/user").then(({data}) => {
            console.log("response van component did mount", data);
            this.setState(data);
            console.log("App mounted after data!🥑");
        }).catch((err) => console.log("error in componentDidMount /user", err));
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
                <h1> HI {this.state.first_name} THIS IS APP</h1>
                <ProfilePic
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    imageUrl={this.state.imageurl}
                    toggleUploader={() => this.toggleUploader()}
                /> 
                <Logo />
                

                {this.state.uploaderIsVisible && <Uploader methodInApp={this.methodInApp} />}
            </div>
        );
    }
}
