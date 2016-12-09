var app = require("./app"),
    http = require("http");

var port = process.env.PORT || "3000";
app.set("port", port);

var server = http.createServer(app);
server.listen(port);
server.on("error", error => {

    console.log(error);
});

server.on("listening", () => {
    var addr = server.address();
    console.log("Server running, listening on port " + addr.port);
});