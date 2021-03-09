import React from "react";
import axios from "./axios";
import { Link }  from "react-router-dom";

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
                if (data.success) {
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
        // console.log("change is running!");
        //get acces/ see what the user is typing
        // console.log("e.target.value: ", e.target.value);
        //this tells the user the name of the input field the user is typing in.
        // console.log("e.target.name", e.target.name);
        //store that input in state

        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state after setState: ")
        );
    }

    render() {
        return (
            <div id="registerDiv">
                <h1 id="registerHere"> REGISTER HERE </h1>
                {this.state.error && <p>something went wront </p>}
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

                <Link to={"/login"}>CLICK HERE TO LOG IN</Link> 
            </div>
        );
    }
}

//onChange tells react to listen to the change event to listen on the inputfield
