const apiService = require("./../data/apiService"),
      utils = require("./../helpers/utils"),
      express = require("express"),
      async = require("async"),
      router = express.Router();

router.get("/list", (req, res, next) => {

    const POPULAR = "Popular", 
          FRIENDS = "Recommend by friends", 
          TODAY_ON_TV = "Today on TV";

    let ListsData = [{ name: POPULAR,     series: [], apiRequest: "tv/popular"      },
                     { name: FRIENDS,     series: [], apiRequest: null              },
                     { name: TODAY_ON_TV, Series: [], apiRequest: "tv/airing_today" }],

    everythingDone = (err) => {
        if (err) {
            next(err);
        }
        else {
            res.send(ListsData);
        }
    },

    apiCallSeries = (listItem, cb) => {

        if (listItem.apiRequest !== null) {
            let requested = (err, data) => {
                
                if (err) {
                    next(err);
                }
                else if (data === null) {
                    next(new Error("Our service is temporarily unavailable"));
                }
                else {
                    switch (listItem.name) {
                        // case "Popular":
                        //     listItem.series = data.results.random(5);
                        //     break;

                        default: 
                            // TODO: case "Today on TV": // check gebruikers favorite series.
                            listItem.series = data.results;
                            break;
                    }
                }
                cb();
            };
            apiService.request(listItem.apiRequest, requested);
        }
        else {
            // TODO: verder uit te werken
            cb();
        }
    },

    genresData = (err, data) => {

        if (data === null) {
           next(new Error("Our service is temporarily unavailable"));
        }
        else {
            // TODO: Check favorite genre van gebruiker en voeg dit toe aan `ListsData`.
            async.each(ListsData, apiCallSeries, everythingDone);
        }
    };

    apiService.request("genre/tv/list",  genresData);
});

module.exports = router;