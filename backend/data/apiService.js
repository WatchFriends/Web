const config = require("./config.json"),
    request = require("request");

module.exports = (() => {

    return {
        request: (path, cb) => {
            request(`${config.api.hostname}${path}${path.indexOf('?') > 0 ? '&' : '?'}api_key=${config.api.keys.random()}`,
                (error, response, body) => {
                    if (error) {
                        return cb(error);
                    }
                    var parsed = JSON.parse(body);
                    if (response.statusCode !== 200) {
                        return cb(new Error(`TMDB: ${response.statusCode} - ${parsed.status_message}`));
                    }
                    cb(null, parsed);
                });
        }
    };
})();
