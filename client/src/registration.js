import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import "./registration.css";

export default class Registration extends React.Component {
    //React.Component should always be written like this with capital R and C
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick() {
        console.log("clicked!!!");
        axios
            .post("/registration", this.state)
            .then(({ data }) => {
                // console.log("/registration data", data);
                if (data.success == true) {
                    //redirect
                    location.replace("/");
                } else {
                    //render an error message
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log(
                    "error in handleclick exios post /registration",
                    err
                );
            });
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state after setState: ")
        );
    }

    render() {
        return (
            <div className="registerContainer">
                <img
                    className="registrationImg"
                    alt="Beautiful Calathea plant"
                    src="./plant-registration.jpeg"
                ></img>
                <div id="registerDiv">
                    <h1 className="plantmore">plantmore</h1>
                    {this.state.error && <p>something went wrong </p>}
                    <input
                        name="first"
                        placeholder="first name"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        placeholder="last name"
                        onChange={(e) => this.handleChange(e)}
                    />
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
                    <div className="register">
                        <Link to={"/login"}>
                            CLICK HERE TO LOG IN
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

//onChange tells react to listen to the change event to listen on the inputfield
