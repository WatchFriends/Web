var app = require("./app"),
    mongoose = require("mongoose"),
    config = require("./data/config.json"),
    http = require("http");

Array.prototype.random = (max) => {
        
    if (max) {
        let picked = [], rnd;

        for (let counter = max; counter--;) { // zou dat werken zo?
            rnd = Math.floor(Math.random() * this.length - 1);
            
            if (picked.indexOf(rnd) >= 0) {
                max++;
            }
            else {
                picked.push(this[rnd]);
            }
        }
        return picked;
    }
    else {
        return this[Math.floor(Math.random() * this.length - 1)]
    }
};

//db
mongoose.Promise = global.Promise;
mongoose.connect(config.db.development);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=>{});

//server
var port = process.env.PORT || "3000";
app.set("port", port);

var server = http.createServer(app);
server.listen(port);
server.on("error", console.log);

server.on("listening", () => {
    var addr = server.address();
    console.log("Server running, listening on port " + addr.port);
});