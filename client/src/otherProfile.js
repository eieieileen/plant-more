import { Component } from "react";
import axios from "./axios";
import FriendshipButton from "./friendshipButton";
import FavoritePlants from "./favoritePlants";
import Private from "./private";

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
            <div className="profilePage">
                <div className="bioPicClass">
                    <h2>
                        {" "}
                        HI EILEEN I AM OTHER PROFIEL
                        {this.state.first_name} {this.state.last_name}
                        <img
                            className="bioPic"
                            src={this.state.imageurl || "/default.jpg"}
                        ></img>
                        <br></br>
                        {this.state.bio}
                    </h2>
                    <FavoritePlants id={this.props.match.params.id} />

                    <FriendshipButton id={this.props.match.params.id} />
                </div>
                <Private id={this.props.match.params.id} />
            </div>
        );
    }
}
