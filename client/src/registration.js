import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    //React.Component should always be written like this with capital R and C
    constructor() {
        super();
        this.state = {
            error: false
        };
    }

    handleClick() {
        console.log("clicked!!!");
        axios.post("/registration", this.state).then(({data}) => {
            // if (everything went according to plan - no errors!) {
            //     //redirect
            //     location.replace("/");
            // } else {
            //     //render an error message
            //     this.setState({
            //         error: true
            //     });

            // }
        }).catch((err) => {
            console.log("error in handleclick exios post /registration", err);
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
            () => console.log("this.state after setState: ", this.state)
        );
    }

    render() {
        return (
            <div>
                <h1> Registration </h1>
                { this.state.error && <p>something went wront :(</p> }
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
                <button onClick={() => this.handleClick()}>Submit!</button>
            </div>
        );
    }
}

//onChange tells react to listen to the change event to listen on the inputfield
