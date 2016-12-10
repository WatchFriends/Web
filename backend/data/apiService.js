const config = require("./config.json"),
      request = require("request");

module.exports = (() => {

    return {
        request: (path, cb) => {

            request(`${config.api.hostname}${path}${path.indexOf("?") > 0 ? "&": "?"}api_key=${config.api.keys[Math.ceil(Math.random() * config.api.keys.length - 1)]}`, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    cb(null, JSON.parse(body));
                }
                else {
                    cb(error, null);
                }
            });
        }
    };
})();
