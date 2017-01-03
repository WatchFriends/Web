const app = require("./app"),
    mongoose = require("mongoose"),
    config = require("./data/config.json"),
    http = require("http"),
    passportconf = require("./data/passport"),
    jwt = require("jsonwebtoken");

//db
mongoose.Promise = global.Promise;
mongoose.connect(config.db.development);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=>{});

//auth
passportconf(config);

//server
let port = process.env.PORT || "3000";
app.set("port", port);

let server = http.createServer(app);
server.listen(port);
server.on("error", console.log);

server.on("listening", () => {
    let addr = server.address();
    console.log("Server running, listening on port " + addr.port);
});