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
        axios
            .post("/bioUpload", this.state)
            .then(({ data }) => {

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
                <div className="bio">
                    tell us about yourself
                    <br></br>
                    {this.props.bio}
                    {this.state.txtArea && (
                        <button className="save" onClick={() => this.handleClick()}>SAVE</button>
                    )}
                    {!this.state.txtArea && (
                        <button
                            className="addOrEdit"
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
                            className="textAreaBio"
                            onChange={(e) => this.handleChange(e)}
                            defaultValue={this.props.bio}
                        />
                    )}
                </div>
            </>
        );
    }
}
