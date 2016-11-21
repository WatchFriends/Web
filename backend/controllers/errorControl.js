const fs = require("fs"),
    errorFileName = "./backend/resources/error.log";

let errorControl = (function () {
    let occurredError = null,
        finalCb = null;

    let writeToErrorLog = function (err, cb) {
        occurredError = err;
        finalCb = cb;

        fs.open(errorFileName, "a+", cbOpened);
    };

    let cbOpened = function (err, fd) {
        if (err) {
            throw err;
        }

        let writeBuffer = new Buffer("\n" + new Date().toLocaleString() + " > " + occurredError),
            bufferLength = writeBuffer.length,
            filePosition = 0;

        fs.write(fd, writeBuffer, 0, bufferLength, filePosition, function (err, result) {
            cbWritten(err, result, fd);
        });
    };

    let cbWritten = function (err, result, fd) {
        if (err) {
            throw err;
        }

        fs.close(fd, cbClosed);
    };

    let cbClosed = function (err, result) {
        if (err) {
            throw err;
        }

        finalCb(occurredError.message);
    };

    return {
        writeToErrorLog: writeToErrorLog
    };
})();

module.exports = errorControl;