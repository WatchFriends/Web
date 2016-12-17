const config = require("./config.json"),
      rnd = require("./../helpers/utils").randomNumber,
      request = require("request");

module.exports = (() => {

    return {
        request: (path, cb) => {

            request(`${config.api.hostname}${path}${path.indexOf("?") > 0 ? "&": "?"}api_key=${config.api.keys.random()}`, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    cb(null, JSON.parse(body));
                }
                else {
                    cb(error, null);
                }
            });
        }
    };
})();
