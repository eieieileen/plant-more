import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnTxt: "",
            txtArea: false,
            bioDraft: "",
        };
    }
    componentDidMount() {
        console.log("this . skeflb", this.props);
        //console.log("grandchild just mounted");
        //console.log("props in grandchild", this.props);
        if (this.props.bio) {
            this.setState({
                btnTxt: "EDIT",
            });
        } else {
            this.setState({
                btnTxt: "ADD",
            });
        }
    }

    handleClick() {
        console.log("i clicked the button 🧈");
        //console.log("this.state van handleClick", this.state);
        axios
            .post("/bioUpload", this.state)
            .then(({ data }) => {
                //console.log("response van BioUpload!!!! I am amazing 🍰", data);
                if (data.success == true) {
                    this.props.editBio(this.state.bioDraft);
                    this.setState({
                        txtArea: false,
                        btnTxt: "EDIT",
                    });
                }
            })
            .catch((err) =>
                console.log("error in bioUpload i hope NOT 🤓", err)
            );
    }

    handleChange(e) {
        this.setState(
            {
                bioDraft: e.target.value,
            },
            () => console.log("this.state after set.state")
        );
    }

    render() {
        return (
            <>
                {/* {this.state.error && <p>something went wront </p>} */}
                <div id="bio">
                    ADD YOUR BIO HERE
                    <br></br>
                    {this.props.bio}
                   
                    {this.state.txtArea && (
                        <button onClick={() => this.handleClick()}>SAFE</button>
                    )}
                    {!this.state.txtArea && (
                        <button id="addOrEdit"
                            onClick={() => {
                                this.setState({ txtArea: !this.state.txtArea });
                            }}
                        >
                            {/* {this.state.btnTxt} */}
                            {this.props.bio ? "EDIT" : "ADD"}
                        </button>
                    )}
                    {this.state.txtArea && (
                        <textarea
                            onChange={(e) => this.handleChange(e)}
                            defaultValue={this.props.bio}
                        />
                    )}
                </div>
            </>
        );
    }
}
