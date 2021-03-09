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

    render() {
        return (
            <div id="loginDiv">
                <h1> LOG IN </h1>
                <input name="email" placeholder="email" />
            </div>
        );
    }



}
