const server = require("./scripts/server"),
    errorControl = require("./scripts/errorControl");

process.on("uncaughtException", function (err) {
    errorControl.writeToErrorLog(err, function (info) {
        console.log("Error written to log files:", info);
    });
});

server.init(5000);