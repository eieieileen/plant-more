import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./logo";
import App from "./app";

let elem; 
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}


ReactDOM.render(elem, document.querySelector("main"));


