const http = require("http"),
      config = require("./config.json");

module.exports = (() => {
    
    let options = {
        method: "GET",
        port: "80",
        hostname: "api.themoviedb.org/3/",
        path: ""
    };

    let call = (url, cb) => {

        options.path =  url + 
                        (url.indexOf("?") > 0 ? "&": "?") + 
                        `api_key=${config.api.keys[0]}`;

        http.request(options, response => {
            var json = "";

            response.on("data", chunk => json += chunk);

            response.on("end", () => {
                var jsonObject = JSON.parse(json.substring(1, json.length - 1).replace(/\\\'/g, ''));
                cb(null, jsonObject);
            });

            response.on("error", err => {
                console.log("api error: " + err.message);
                cb(err);
            });
        }).end();
    };

    return {
        call,
        getSeries: (id, cb) => call(`tv/${id}?append_to_response=images,similar`, cb)
    };
})();
