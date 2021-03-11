////// links //////
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bcrypt.js");
const db = require("./db");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");

////// links //////

////// multer  //////
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
////// multer //////

////// middleware //////
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use((req, res, next) => {
    console.log(`MIDDLEWARE LOG: ${req.method} to ${req.url} route`);
    next();
});
app.use(express.json());
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
////// middleware //////

////// routes //////

app.get("/welcome", (req, res) => {
    //is going to run if the user puts /welcome in the url bar
    if (req.session.loggedIn) {
        //if user is logged in they are NOT allowed to see the welcome page, so we redirect them away from /welcome to /
        res.redirect("/");
    } else {
        //send back html, which will then trigger start.js to render Welcome in DOM.
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    // console.log("req.params van /registration", req.body);
    //first, last, email, password uit registration.js input name
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPassword) => {
            db.addUser(first, last, email, hashedPassword)
                .then(({ rows }) => {
                    console.log("response van db.addUser", rows[0]);
                    req.session.loggedIn = rows[0].id; // user_id in een cookie zetten
                    res.json({ success: true });
                    //res.redirect("/");
                })
                .catch((err) => {
                    console.log("error in db.addUser 💔", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in hash(password)🏰", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.checkPassword(email)
        .then(({ rows }) => {
            console.log("response van db loginUser", rows);
            if (rows[0].id) {
                const id = rows[0].id;
                compare(password, rows[0].password_hash).then((match) => {
                    if (match == true) {
                        req.session.loggedIn = id;
                        res.json({ success: true });
                        //res.redirect("/");
                    } else {
                        res.json({ success: false });
                    }
                });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("error in app.post /login :((((", err);
            res.json({ success: false });
        });
});

app.post("/resetpassword", (req, res) => {
    const { email } = req.body;
    db.checkPassword(email)
        .then(() => {
            const cryptoRandomString = require("crypto-random-string");
            const secretCode = cryptoRandomString({
                length: 6,
            });
            db.insertSecretCode(email, secretCode)
                .then(() => {
                    sendEmail(
                        email,
                        secretCode,
                        "HERE IS YOUR TACO NETWORK CODE TACO TACO TACO"
                    )
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) =>
                            console.log(
                                "error in insertSecretCode :((( 🐸",
                                err
                            )
                        );
                })
                .catch((err) => {
                    console.log("error in db.insertSecretCode 🧜‍♀️", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => console.log("error in app post /resetpassword", err));
    //db query to check if email exists. same query you use in login
});

app.post("/resetpasswordverify", (req, res) => {
    const { email, code, password } = req.body;
    db.findSecretCode(email, code)
        .then(() => {
            hash(password)
                .then((hashedPassword) => {
                    db.updatePassword(password, email, hashedPassword)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log("error in db.updatePassword", err);
                            res.json({ success: false });
                        });
                })
                .catch((err) => {
                    console.log(
                        "error in hash password resetpasswordverify",
                        err
                    );
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in resetpasswordverify 🧁", err);
            res.json({ success: false });
        });
});

app.get("/user", (req, res) => {
    //console.log("hey hij werkt nie");
    db.getProfileInfo(req.session.loggedIn)
        .then(({ rows }) => {
            console.log("response from getProfilePic", rows);
            res.json(rows[0]);
        })
        .catch((err) => console.log("error in app.get /users 🧤", err));
});

app.post("/picUpload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file.filename;

    const imgToAws = {
        url: "https://s3.amazonaws.com/eileensimageboard/" + filename,
    };

    if (req.file) {
        db.addPic("https://s3.amazonaws.com/eileensimageboard/" + filename)
            .then((response) => {
                console.log("response van addPic", response);
            })
            .catch((err) => console.log("error in db.addPic 🐫", err));
    }
});

//moet altijd onderaan staan
app.get("*", function (req, res) {
    //runs if the user goes to leterally any route except /welcome
    if (!req.session.loggedIn) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

////// routes //////

////// listening //////
app.listen(process.env.PORT || 3001, function () {
    console.log("✨ my queen, don't worry, you're doing great ✨");
});
////// llistening //////
