const config = require("./config.json"),
      rnd = require("./../helpers/utils").randomNumber,
      request = require("request");

module.exports = (() => {

    return {
        request: (path, cb) => {

            let url = `${config.api.hostname}${path}${path.indexOf("?") > 0 ? "&": "?"}api_key=${config.api.keys.random()}`;
            
            request(url, (error, response, body) => {
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
