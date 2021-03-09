import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }

    handleClick() {
        console.log("clicked!!!");
        axios.post("/resetpassword", this.state).then(({ data }) => {
            if (data.success) {
                location.replace("/login");
            } else {
                this.satState({
                    error: true,
                });
            }
        });
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
                <div>
                    <input
                        name="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleClick()}>SUBMIT</button>
                </div>
            );
        }
        if (this.state.step == 2) {
            return (
                <div>
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
                    <button onClick={() => this.handleClick()}>SUBMIT</button>
                </div>
            );
        }
        if (this.state.step == 3) {
            return (
                <div>
                    <h2>🌮 WELCOME BACK TACO LOVER 🌮</h2>
                    <Link to={"/login"}>CLICK HERE TO LOG IN</Link>
                </div>
            );
        }
    }
}
