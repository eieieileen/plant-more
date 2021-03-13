import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};

    // }

    // componentDidMount() {
    //     //this is the prop that is automatically passed down when we have a dynamic route
    //     console.log("this.props.match: ", this.props.match);
    //     console.log("the id is: ", this.props.match.params.id);

    //     //TO DO part 6
    //     //we should make a request to our server to get the other users data
    //     //IF we try to view our own profile b going to /user/OURID, then we should make sure to send the user back to the "/" route -> render our profile ocmponent.

    //     //dont use === because the id is actually a string
    //     //get id from the cookie, 100 is hardcoded.
    //     if (this.props.match.params.id == 100) {
    //         this.props.history.push("/");
    //     }
    // }

    render(){
        return (
            <div>
                <h1>I am the other profile!</h1>
                <h2> I will be responsible for displaying other users information including their profile pic and bio but no one will be able to edit the information in here!</h2>
            </div>
        );
    }
}