const dbService = require("./../data/databaseService.js"),
      apiService = require("./../data/apiService.js"),
      express = require("express"),
      async = require("async"),
      router = express.Router();

router.get("/list", (req, res, next) => {

    dbService.getLists((err, data) => {
        if (err) {
            next(err);
        }
        else {
            
            let seriesData = [],
                apiRequests = [];

            for (let listIndex = data.length; listIndex--;) {

                let theName = data[listIndex].name;

                seriesData.push({
                    name: theName,
                    series: []
                });

                for (let seriesIndex = data[listIndex].series.length; seriesIndex--;) {

                    let id = data[listIndex].series[seriesIndex];

                    apiRequests.push({
                        destinationListName: theName,
                        tmdbId: id
                    });
                }
            }

            let apiCall = (apiReq, cb) => {
                apiService.request(`tv/${apiReq.tmdbId}?append_to_response=images,similar`, (err, data) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        for (let listIndex = seriesData.length; listIndex--;) {
                            let name = seriesData[listIndex].name;

                            if (name == apiReq.destinationListName) {
                                seriesData[listIndex].series.push(data);
                                cb();
                            }
                        }
                    }
                });
            },
            afterApiCall = (err) => {
                if (err) {
                    next(err);
                }
                else {
                    res.send(seriesData);
                }
            };

            async.each(apiRequests, apiCall, afterApiCall);
        }
    });
});

module.exports = router;