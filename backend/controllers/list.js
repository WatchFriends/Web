const apiService = require("./../data/apiService"),
      utils = require("./../helpers/utils"),
      express = require("express"),
      async = require("async"),
      router = express.Router();

router.get("/list", (req, res, next) => {

    const POPULAR = "Popular", 
          FRIENDS = "Recommend by friends", 
          TODAY_ON_TV = "Today on TV";

    let ListsData = [{ name: POPULAR,     series: [], apiRequest: "tv/popular"      , page: 1, totalPages: 0 },
                     // { name: FRIENDS,     series: [], apiRequest: ""                , page: 1, totalPages: 0 },
                     { name: TODAY_ON_TV, series: [], apiRequest: "tv/airing_today" , page: 1, totalPages: 0 }],

    everythingDone = (err) => {
        if (err) {
            next(err);
        }
        else {

            for (let i = ListsData.length; i--;) {
                let url = ListsData[i].apiRequest;
                
                if (url != null) {
                    ListsData[i].apiRequest = url.replace("tv", "series/get");
                }
            }

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
                            listItem.totalPages = data.total_pages;
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