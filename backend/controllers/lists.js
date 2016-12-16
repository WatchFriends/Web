const dbService = require("./../data/databaseService.js"),
      apiService = require("./../data/apiService.js"),
      express = require("express"),
      async = require("async"),
      router = express.Router();

router.get("/list", (req, res, next) => {

    let ListsData = [{ name: "Popular",              series: [], apiRequest: "tv/popular",      seriesId: null },
                     { name: "Recommend by friends", series: [], apiRequest: null,              seriesId: null },
                     { name: "Today on TV",          series: [], apiRequest: "tv/airing_today", seriesId: null }];

    let everythingDone = (err) => {
        if (err) {
            next(err);
        }
        else {
            res.send(ListsData);
        }
    };

    let apiCall = (listItem, cb) => {

        if (listItem.seriesId !== null) {

            async.each(listItem.seriesId, (id, cb2) => {
                apiService.request(`tv/${id}`, (err, data) => {
                    listItem.series.push(data);
                    cb2();
                });
            }, cb);
        }

        else if (listItem.seriesId === null && listItem.apiRequest !== null) {

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

    let dbData = (err, data) => {
        if (err) {
            next(err);
        }
        else {
            for (let dataIndex = data.length; dataIndex--;) {
                ListsData.push({
                    name: data[dataIndex].name,
                    series: [],
                    apiRequest: "tv/{id}",
                    seriesId: data[dataIndex].series
                });
            }
        }

        async.each(ListsData, apiCall, everythingDone);
    };

    dbService.getLists(dbData);
});

module.exports = router;