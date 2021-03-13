import React from "react";


export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            btnTxt: "",
        };
    }
    componentDidMount() {
        console.log("grandchild just mounted");
        console.log("props in grandchild", this.props);
        if (this.props.favoriteSweet) {
            this.setState({
                btnTxt: "edit",
            });
        } else {
            this.setState({
                btnTxt: "add",
            });
        }
    }
    render() {
        return (
            <>
                <h1>Hi I am the bioEditor {this.props.favoriteSweet}</h1>
                <button>{this.state.btnTxt}</button>
                <textarea defaultValue={this.props.favoriteSweet} />
            </>
        );
    }
}
