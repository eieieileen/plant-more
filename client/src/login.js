import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";



export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick() {
        console.log("clicked!!!!!!");
        axios.post("/login", this.state).then(({data}) => {
            if (data.success == true) {
                location.replace("/");
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        },
        () => console.log("this.state after set.state", this.state)
        
        );
    }

    render() {
        return (
            <div id="loginDiv">
                <h1> LOG IN </h1>
                {this.state.error && <p>something went wront </p>}
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button
                    className="submitButton"
                    onClick={() => this.handleClick()}
                >
                    SUBMIT
                </button>
                <Link to={"/"}>CLICK HERE TO REGISTER</Link> <br></br>
                <Link to={"/resetpassword"}>FORGOT PASSWORD?</Link>
            </div>
        );
    }



}
