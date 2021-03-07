////// links //////
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bcrypt.js");
const db = require("./db")


////// links //////

////// middleware //////
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use((req, res, next) => {
    console.log(`MIDDLEWARE LOG: ${req.method} to ${req.url} route`);
    next();
});
app.use(express.json());
////// middleware //////

////// routes //////

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

app.post("/registration", (req, res) => {
   // console.log("req.params van /registration", req.body);
    //first, last, email, password uit registration.js input name
    const { first, last, email, password } = req.body;

    hash(password).then((hashedPassword) => {
        db.addUser(first, last, email, hashedPassword).then(({rows}) => {
            console.log("response van db.addUser", rows[0]);
            req.session.userId = rows[0].id // user_id in een cookie zetten
              res.json({ success: true });
        }).catch((err) => {
            console.log("error in db.addUser 💔", err);
              res.json({ success: false });
        })
    });
});

////// routes //////


////// listening //////
app.listen(process.env.PORT || 3001, function () {
    console.log("✨ my queen, don't worry, you're doing great ✨");
});
////// llistening //////