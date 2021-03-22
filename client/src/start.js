import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./sockets";
// const store = createStore(reducer);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

import Welcome from "./welcome";
import App from "./app";

let elem; 
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


ReactDOM.render(elem, document.querySelector("main"));


