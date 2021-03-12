import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Logo from "./logo";
import axios from "./axios";

// import { BrowserRouter, Route } from "react-router-dom";
// import OtherProfile from "./otherProfile";

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
        axios
            .get("/user")
            .then(({ data }) => {
                console.log("response van component did mount", data);
                this.setState(data);
                console.log("App mounted after data!🥑");
            })
            .catch((err) =>
                console.log("error in componentDidMount /user", err)
            );
        //here is where we want to make an axios request to "get"  info about the logged in user (first name, last name, profile picture)
        // a good route for our axios would be /user
        //once you have the info from the server, add this information to the state of the component
        //you can do this by using a method called setState
    }

    methodInApp(arg) {
        console.log(
            "method in App is running - the Argument passed to it is: ",
            arg
        );
        this.setState({
            imageurl: arg,
        });
        console.log("upload finished ", this.state);
    }

    toggleUploader() {
        console.log("toggleUploader is running!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            // <BrowserRouter>
            <div>
                <h1> HI {this.state.first_name} THIS IS APP</h1>
                <ProfilePic
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    imageUrl={this.state.imageurl}
                    toggleUploader={() => this.toggleUploader()}
                />
                {/* 6, if not giving props. if giving props: render={() => (render profile in here)} */}
                {/* <Route exact path="/" component={Profile} /> */}
                <Logo />

                {/* <Route path="/user/:id" component={OtherProfile} /> */}

                {/* <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                            // react is able to update the component because of this.
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    /> whenever working with dynamic route and render we can not forget match!!!! */}

                {this.state.uploaderIsVisible && (
                    <Uploader
                        methodInApp={(arg) => this.methodInApp(arg)}
                        toggleUploader={() => this.toggleUploader()}
                    />
                )}
            </div>
            // </BrowserRouter>
        );
    }
}
