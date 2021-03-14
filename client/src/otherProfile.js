import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //this is the prop that is automatically passed down when we have a dynamic route
        console.log("this.props.match: ", this.props);
        console.log("the id is: ", this.props.match.params.id);

        axios
            .post("/getOtherProfileInfo", { id: this.props.match.params.id })
            .then(({ data }) => {
                if (data.success == false) {
                    this.props.history.push("/");
                } else {
                    console.log("response van getOtherProfileInfo", data);
                    this.setState(data);
                }
            })
            .catch((err) => console.log("error in acios getOtherProfile", err));

    }

    render() {
        return (
            <div>
                <h1>I am the other profile!</h1>
                <h2>
                    <img src={this.state.imageurl}></img>
                    {this.state.first_name} {this.state.last_name}
                    {this.state.bio}
                </h2>
            </div>
        );
    }
}
