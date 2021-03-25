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
const fetch = require("node-fetch");
const secrets = require("./secrets.json");
//socket.io boiletplate
const server = require("http").Server(app); //app because of first handshake handshake
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

////// links //////

//loggedIn is userId

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
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

////// API //////
app.get("/trefleApi/:search", (req, res) => {
    const searching = req.params.search;

    (async () => {
        const response = await fetch(
            `https://trefle.io/api/v1/plants/search?token=${secrets.TREFLE_TOKEN}&q=${searching}`
        );
        const json = await response.json();
        //console.log(json);
        res.json(json);
    })();
});
////// API //////

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
            //console.log("response from getProfilePic", rows);
            res.json(rows[0]);
        })
        .catch((err) => console.log("error in app.get /users 🧤", err));
});

app.post("/picUpload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    console.log("req.file", req.file);

    const imgToAws = {
        url: "https://s3.amazonaws.com/eileensimageboard/" + filename,
    };

    if (req.file) {
        db.addPic(imgToAws.url, req.session.loggedIn)
            .then((response) => {
                console.log("response van addPic", response);
                res.json(imgToAws);
            })
            .catch((err) => console.log("error in db.addPic 🐫", err));
    }
});

app.post("/bioUpload", (req, res) => {
    const { bioDraft } = req.body;

    db.addBio(bioDraft, req.session.loggedIn)
        .then(() => {
            //console.log("response van bio upload", response);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in db.addBio🦍", err);
            res.json({ success: false });
        });
});

app.post("/getOtherProfileInfo", (req, res) => {
    if (req.body.id == req.session.loggedIn) {
        res.json({ success: false });
        //res.redirect("/");
    } else {
        //console.log("req params or body", req.body);
        db.getInfoOtherUser(req.body.id)
            .then(({ rows }) => {
                if (rows[0]) {
                    //console.log("response van getInfoOtherUsers", rows);
                    res.json(rows[0]);
                } else {
                    res.json({ success: false });
                }
            })
            .catch((err) => console.log("error in dbgetInfoOtherUser", err));
    }
});

app.get("/users/most-recent", (req, res) => {
    db.mostRecent()
        .then(({ rows }) => {
            //console.log("response van mostRecent😳", rows);
            res.json(rows);
        })
        .catch((err) => console.log("console.log van most recent🧏‍♀️", err));
});

app.get("/search/users/:search", (req, res) => {
    //console.log("req.params", req.params);
    db.findUsers(req.params.search)
        .then(({ rows }) => {
            console.log("response van db.findUsers", rows);
            res.json(rows);
        })
        .catch((err) => console.log("error in db.findUsers💅", err));
});

app.get("/addFriends/:id", (req, res) => {
    const loggedIn = req.session.loggedIn;
    const otherUser = req.params.id;
    db.checkFriends(loggedIn, otherUser)
        .then(({ rows }) => {
            console.log("response van check db.addFriends", rows);
            res.json({ rows: rows[0], loggedIn: req.session.loggedIn });
        })
        .catch((err) => console.log("error in db.addFriends 🌂", err));
});

app.post("/requestFriend", (req, res) => {
    const { action, otherUser } = req.body;
    if (action === "ADD TACO FRIEND") {
        db.friendRequest(req.session.loggedIn, otherUser)
            .then(({ rows }) => {
                console.log("response van db.friendRequest", rows[0]);
                res.json({ rows: rows[0], loggedIn: req.session.loggedIn });
            })
            .catch((err) => console.log("error in db.friendRequest", err));
    } else if (
        action == "CANCEL TACO FRIEND" ||
        action == "UNFRIEND FRIENDLY TACO"
    ) {
        db.deleteFriend(req.session.loggedIn, otherUser)
            .then(({ rows }) => {
                console.log("response van db.deleteFriend", rows[0]);
                res.json({ rows: rows[0], loggedIn: req.session.loggedIn });
            })
            .catch((err) => console.log("error in db.deletefriend", err));
    } else {
        db.acceptFriend(req.session.loggedIn, otherUser)
            .then(({ rows }) => {
                console.log("console.log van db.acceptFriend 🦔", rows[0]);
                res.json({ rows: rows[0], loggedIn: req.session.loggedIn });
            })
            .catch((err) =>
                console.log("error in db.acceptFRIEND JE MOEDER 🌺", err)
            );
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
});

app.get("/get-friends", (req, res) => {
    db.getFriendsList(req.session.loggedIn)
        .then(({ rows }) => {
            console.log("response van db.getFriendsList", rows);
            res.json(rows);
        })
        .catch((err) => console.log("error in /get-friends", err));
});

app.post("/accept-friend", (req, res) => {
    const { otherUser } = req.body;
    db.acceptFriend(req.session.loggedIn, otherUser)
        .then(({ rows }) => {
            console.log("response van accept-friend", rows[0]);
            res.json({ rows: rows[0], loggedIn: req.session.loggedIn });
        })
        .catch((err) => console.log("err in post .acceptFriend", err));
});

app.post("/unfriend-friend", (req, res) => {
    const { otherUser } = req.body;
    db.deleteFriend(req.session.loggedIn, otherUser)
        .then(({ rows }) => {
            console.log("rows van app.post /unfriend-friend", rows[0]);
            res.json({ rows: rows[0], loggedIn: req.session.loggedIn });
        })
        .catch((err) => console.log("error in /unfriend-friend", err));
});

//moet altijd onderaan staan
app.get("*", function (req, res) {
    //runs if the user goes to literally any route except /welcome
    if (!req.session.loggedIn) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

////// routes //////

////// listening //////
server.listen(process.env.PORT || 3001, function () {
    console.log("✨ my queen, don't worry, you're doing great ✨");
});
////// llistening //////

let onlineUsers = {};
//For social network io.on is under the server.listen
io.on("connection", (socket) => {
    console.log(`socket with id: ${socket.id} has connected`);

    if (!socket.request.session.loggedIn) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.loggedIn;
    console.log("userId in sockets:", userId);

    onlineUsers[socket.id] = userId;

    const onlineUserIds = Object.values(onlineUsers);

    //if (Object.values(onlineUsers).includes(userId) > 1) {

    db.getUsersByIds(onlineUserIds)
        .then(({ rows }) => {
            //console.log("response van onlineUserIds", rows);
            socket.emit("online users", rows);
        })
        .catch((err) => console.log("error in db.getUsersByIds", err));

    if (onlineUserIds.filter((id) => id == userId).length == 1) {
        db.infoNewMessage(userId)
            .then(({ rows }) => {
                //console.log("response van db.infoNewMessage", rows);
                socket.broadcast.emit("new user just joined", rows[0]);
            })
            .catch((err) =>
                console.log("error in db.infoNewMessage in socket", err)
            );
    }

    db.tenMostRecentMessages()
        .then(({ rows }) => {
            //console.log("response.rows!!", rows);
            socket.emit("chatMessages", rows.reverse());
        })
        .catch((err) =>
            console.log("error in db.tenMostRecentMessages 👻", err)
        );

    //this was demo purposes
    //socket.emit("userConnected", { msg: "hello user!" });

    socket.on("my amazing chat message", (msg) => {
        console.log("msg inside my amazing chat message: ", msg);
        db.newMessage(userId, msg)
            .then(({ rows }) => {
                const created_at = rows[0].created_at;
                db.infoNewMessage(userId)
                    .then(({ rows }) => {
                        console.log(
                            "response van db.infoNewMessage 🤓",
                            rows[0]
                        );
                        io.sockets.emit("This is the new Message", {
                            userId: userId,
                            message: msg,
                            first_name: rows[0].first_name,
                            last_name: rows[0].last_name,
                            imageurl: rows[0].imageurl,
                            created_at: created_at,
                        });
                    })
                    .catch((err) =>
                        console.log("error in db.infoNewMessage", err)
                    );
            })
            .catch((err) => console.log("error in db.newMessage,", err));
        io.sockets.emit("sending back to client", msg);
    });

    socket.on("disconnect", function () {
        console.log(`socket with id: ${socket.id} just disconnected!`);
        delete onlineUsers[socket.id];
        if (Object.values(onlineUsers).indexOf(userId) < 0) {
            socket.broadcast.emit("user left", { user: userId });
        }
    });
});
