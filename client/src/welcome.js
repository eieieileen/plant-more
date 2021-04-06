import Registration from "./registration";
import Footer from "./footer";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div id="welcomePage">

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpassword" component={ResetPassword} />
                </div>
            </HashRouter>
           
            <Footer /> 
        </div>
    );
}

