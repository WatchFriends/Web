const server = require("./scripts/server"),
    errorControl = require("./controllers/errorControl");

process.on("uncaughtException", function (err) {
    errorControl.writeToErrorLog(err, function (info) {
        console.log("Error written to log file:", info);
    });
});

server.init(5000);