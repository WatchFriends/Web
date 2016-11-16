const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      app = require('express')(),
      server = http.Server(app),
      io = require('socket.io')(http);

let port = process.env.port || 8080,
    extentions = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".jpg": "text/jpeg",
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

http.createServer(function (req, res) {

    if (req.url === "/" || req.url === "") {
        req.url = "index.html";
    }

    let filename = path.basename(req.url),
        ext = path.extname(filename),
        localPath = "",
        fnfPage = path.normalize(process.cwd() + "/wwwroot/404.html");

    if (req.url.startsWith("/data")) {
        localPath = path.normalize(process.cwd() + req.url)
    }
    else {
        localPath = path.normalize(process.cwd() + "/wwwroot/" + req.url)
    }

    var readFile = function(err, content) {

        if (err) {

            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write("<p><b>500: Server error:</b></p><pre>" + err.message + "</pre>");
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': extentions[ext] });
            res.end(content);
        }
    };

    var checkFile = function(err, stats) {
            
        if (err) {
            fs.readFile(fnfPage, readFile);
        }
        else {
            if(stats.isFile()) {
                fs.readFile(localPath, readFile);
            }
            else {
                console.error("not a file");     
            }
        }
    };

    if (extentions[ext]) {
        fs.stat(localPath, checkFile);
    }

    io.on('connection', function(socket){
        console.log('a user connected');
    });
}).listen(port);