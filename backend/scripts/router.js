const fs = require("fs"),
    path = require("path"),
    url = require("url"),
    getAPIData = require("./getAPIData"),
    requestCounter = require("./requestCounter"),
    achievementControl = require("./../controllers/achievementControl.js");

let router = (() => {
    let extensions = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".jpg": "text/jpeg",
        ".jpeg": "text/jpeg",
        ".gif": "text/gif",
        ".png": "text/png",
        ".svg": "application/xml",
        ".json": "application/json",
        ".woff": "application/x-font-woff",
        ".eot": "application/vnd.ms-fontobject",
        ".woff2": "application/font-woff2",
        ".otf": "application/x-font-opentype",
        ".ttf": "application/x-font-ttf",
        ".ico": "image/x-icon"
    };

    let readFile = (localPath, cb) => {

        fs.stat(localPath, (err, stats) => {
            if (err) {
                cb(null, 404, "404 File not found:\n" + err.message);
            } 
            else if (stats && stats.isFile()) {
                console.log("Rendering page:", localPath);

                fs.readFile(localPath, (err, content) => {
                    if (err) {
                        cb(null, 500, "500 Server error:\n" + err.message);
                    } else {
                        cb(null, 200, content);
                    }
                });
            } 
            else {
                cb(err, null, null);
            }
        });
    };

    let init = (req, cb) => {
        let fileName = path.basename(req.url),
            ext = path.extname(fileName),
            localPath = path.normalize(process.cwd() + "/wwwroot/" + req.url),
            pathName = url.parse(req.url).pathname,
            queryString = url.parse(req.url).query;

        if (extensions[ext]) {
            readFile(localPath, (err, code, data) => {
                if (err) {
                    cb(err, null, null, null);
                }

                cb(null, code, data, extensions[ext]);
            });
        } 
        else {

            let split = pathName.split("/");

            switch (split[1]) {
                case "data":
                    switch (split[2]) {
                        case "achievements":

                            achievementControl.getAchievements((err, data) => {
                                
                                let json = JSON.stringify(data);
 
                                cb(null, 200, json, null);
                            });
                            break;

                        default:
                            cb(null, 404, "404 File not found", null);
                            break;
                    }

                    break;

                default:
                    cb(null, 404, "404 File not found", null);
                    break;
            }
        }
    };

    return {
        init: init
    };
})();

module.exports = router;