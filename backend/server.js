const app = require("./app"),
      mongoose = require("mongoose"),
      config = require("./data/config.json"),
      http = require("http"),
      passportconf = require("./data/passport");

//db
mongoose.Promise = global.Promise;
mongoose.connect(config.db.development, (error) => {
    if (error) {
        console.error.bind(console, error.message);
    }
});

let db = mongoose.connection,
    port = process.env.PORT || "3000",
    server;

db.on("error", () => {
    console.error.bind(console, "connection error");
});

db.once("open", ()=> {
    console.log("hahaha");
});

//auth
passportconf(config);

//server
app.set("port", port);

server = http.createServer(app);

server.listen(port);
server.on("error", console.log);

server.on("listening", () => {
    let addr = server.address();
    console.log("Server running, listening on port " + addr.port);
});