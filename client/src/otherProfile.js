import { Component } from "react";
import axios from "./axios";
import FriendshipButton from "./friendshipButton";
import FavoritePlants from "./favoritePlants";
import "./otherProfile.css";

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
                    //console.log("response van getOtherProfileInfo", data);
                    this.setState(data);
                }
            })
            .catch((err) => console.log("error in acios getOtherProfile", err));
    }

    render() {
        return (
            <div className="otherProfileContainer">
                <div className="otherProfileDiv">
                    <h2 className="introOtherProfile">
                        {" "}
                        this is {this.state.first_name} {this.state.last_name}
                    </h2>
                    <img
                        className="otherProfilePicture"
                        src={this.state.imageurl || "/default.jpg"}
                    ></img>
                    <br></br>
                    <p className="introBio">{this.state.bio} </p>
                </div>

                <FavoritePlants id={this.props.match.params.id} />
                <FriendshipButton id={this.props.match.params.id} />
            </div>
        );
    }
    //1
}
