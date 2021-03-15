import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Logo from "./logo";
import axios from "./axios";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherProfile";
import FindPeople from "./findPeople";

// import { BrowserRouter, Route } from "react-router-dom";
// import OtherProfile from "./otherProfile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        // console.log("App mounted!🥑");
        axios
            .get("/user")
            .then(({ data }) => {
                //console.log("response van component did mount", data);
                this.setState(data);
                console.log("App mounted after data!🥑");
            })
            .catch((err) =>
                console.log("error in componentDidMount /user", err)
            );
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
            <BrowserRouter>
                <div>
                    <div  id="profilePicca">
                        <ProfilePic
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                            imageUrl={this.state.imageurl}
                            toggleUploader={() => this.toggleUploader()}
                            classN="profile-pic"
                        />
                    </div>

                    <Logo />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                editBio={(bio) => this.setState({ bio: bio })}
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                imageUrl={this.state.imageurl}
                                bio={this.state.bio}
                                toggleUploader={() => this.toggleUploader()}
                            />
                        )}
                    />

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            methodInApp={(arg) => this.methodInApp(arg)}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route path="/users/search" render={() => <FindPeople />} />
                </div>
            </BrowserRouter>
        );
    }
}
