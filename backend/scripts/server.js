const http = require("http"),
      router = require("./router");

let server = function () {
    let httpListen = function (httpPort) {
        
        let currentServer = http.createServer(function (req, res) {
            if (req.url === "/" || req.url === "") {
                req.url = "index.html";
            }

            let cbData = function (err, code, data, mimeType) {
                if (err) {
                    res.end();
                    throw err;
                }

                switch (code) {
                    case 200:
                        if (mimeType !== null) {
                            res.writeHead(code, {
                                'Content-Type': mimeType
                            });
                        } else {
                            res.writeHead(code);
                        }
                        res.end(data);
                        break;
                    default:
                        console.log(data);
                        res.writeHead(code);
                        res.write(data);
                        res.end();
                        break;
                }
            };

            router.init(req, cbData);
        });

        currentServer.listen(httpPort);
    };

    let init = function (httpPort) {
        console.log("Server running on port:", httpPort);
        httpListen(httpPort);
    };

    return {
        init: init
    };
}();

module.exports = server;