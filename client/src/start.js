import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

let elem; 
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <Logo />;
}

ReactDOM.render(elem, document.querySelector("main"));


// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }
