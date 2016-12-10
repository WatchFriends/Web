const http = require("http"),
      config = require("./config.json"),
      request = require("request");

module.exports = (() => {

    return {
        url: (path, cb) => {

            let number = Math.ceil(Math.random() * config.api.keys.length - 1);
            
            cb(null, `http://api.themoviedb.org/3/${path}${path.indexOf("?") > 0 ? "&": "?"}api_key=${config.api.keys[number]}`);
        }
    };
})();
