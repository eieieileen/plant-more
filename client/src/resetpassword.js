import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import "./resetPassword.css";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }

    handleClick() {
        console.log("clicked!!!");
        if (this.state.step == 1) {
            axios.post("/resetpassword", this.state).then(({ data }) => {
                if (data.success) {
                    this.setState({
                        step: 2,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
        } else if (this.state.step == 2) {
            axios.post("/resetpasswordverify", this.state).then(({ data }) => {
                if (data.success) {
                    this.setState({
                        step: 3,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
        }
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state after setState:", this.state)
        );
    }

    render() {
        if (this.state.step == 1) {
            return (
                <div className="resetP1Container">
                    <img
                        className="resetPasswordImg"
                        src="./plant-registration.jpeg"
                        alt="Beautiful Calathea plant"
                    ></img>
                    <div className="p1Div">
                        <h1 className="plantmore">plantmore</h1>
                        <input
                            name="email"
                            placeholder="email"
                            onChange={(e) => this.handleChange(e)}
                        />

                        <button
                            className="submitButtonRP"
                            onClick={() => this.handleClick()}
                        >
                            SUBMIT
                        </button>
                        <Link to={"/"}>GO BACK TO REGISTER</Link>
                    </div>
                </div>
            );
        }
        if (this.state.step == 2) {
            return (
                <div className="resetP2Container">
                    <img
                        className="resetPasswordImg"
                        src="./plant-registration.jpeg"
                        alt="Beautiful Calathea plant"
                    ></img>
                    <div className="p2Div">
                        <h1 className="plantmore">plantmore</h1>
                        <input
                            name="code"
                            placeholder="code"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            className="submitButtonRP"
                            onClick={() => this.handleClick()}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            );
        }
        if (this.state.step == 3) {
            return (
                <div className="resetP3Container">
                    <img
                        className="resetPasswordImg"
                        src="./plant-registration.jpeg"
                        alt="Beautiful Calathea plant"
                    ></img>
                    <div className="p3Div">
                        <h1>plantmore</h1>
                        <Link to={"/login"}>CLICK HERE TO LOG IN</Link>
                    </div>
                </div>
            );
        }
    }
}
