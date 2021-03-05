const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//need cookie session middleware
app.get("/welcome", (req, res) => {
    //is going to run if the user puts /welcome in the url bar
    if (req.session.userId) {
        //if user is logged in they are NOT allowed to see the welcome page, so we redirect them away from /welcome to /
        res.redirect("/");
    } else {
        //send back html, which will then trigger start.js to render Welcome in DOM.
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("*", function (req, res) {
    //runs if the user goes to leterally any route except /welcome
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
