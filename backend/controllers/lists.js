const apiService = require("./../data/apiService.js"),
      express = require("express"),
      async = require("async"),
      router = express.Router();

router.get("/list", (req, res, next) => {

    let ListsData = [{ name: "Popular",              series: [], apiRequest: "tv/popular" },
                     { name: "Recommend by friends", series: [], apiRequest: null },
                     { name: "Today on TV",          series: [], apiRequest: "tv/airing_today" }];

    let everythingDone = (err) => {
        if (err) {
            next(err);
        }
        else {
            res.send(ListsData);
        }
    };

    let apiCallSeries = (listItem, cb) => {

        if (listItem.seriesId === null && listItem.apiRequest !== null) {

            apiService.request(listItem.apiRequest, (err, data) => {
                
                if (listItem.name == "Popular") {

                    let rnd,
                        picked = [];
                    
                    for (let counter = 5; counter--;) {

                        rnd =  Math.ceil(Math.random() * data.results.length - 1);

                        if (picked.indexOf(rnd) >= 0) {
                            counter++;
                        }
                        else {
                            picked.push(rnd);
                            listItem.series.push(data.results[rnd]);
                        }
                    }
                }
                else {
                    // TODO: if (listname == "Today on TV") { // check gebruikers favorite series. }
                    listItem.series = data.results;
                }

                cb();
            });
        }
        else if (listItem.seriesId === null && listItem.apiRequest === null) {
            // TODO: verder uit te werken
            cb();
        }
    };

    let genresData = (err, data) => {

        // TODO: Check favorite genre van gebruiker en voeg dit toe aan `ListsData`.
        async.each(ListsData, apiCall, everythingDone);
    };

    apiService.request("genre/tv/list",  genresData);
});

module.exports = router;