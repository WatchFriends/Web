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
                        path: `tv/${id}?append_to_response=images,similar`
                    });
                }
            }

            let popularListName = "Popular";

            seriesData.push({
                name: popularListName,
                series: []
            });

            apiRequests.push({
                destinationListName: popularListName,
                path: `tv/popular`
            });

            let apiCall = (apiReq, cb) => {
                apiService.request(apiReq.path, (err, data) => {
                    if (err) {
                        next(err);
                    }
                    else {

                        if (apiReq.destinationListName == popularListName) {

                            for (var i = 5; i--;) {                            
                                let seriesIndex = Math.ceil(Math.random() * data.results.length - 1);

                                for (let listIndex = seriesData.length; listIndex--;) {
                                    let name = seriesData[listIndex].name;

                                    if (name == apiReq.destinationListName) {
                                        seriesData[listIndex].series.push(data.results[seriesIndex]);
                                    }
                                }
                            }
                        }
                        else {
                            for (let listIndex = seriesData.length; listIndex--;) {
                                let name = seriesData[listIndex].name;

                                if (name == apiReq.destinationListName) {
                                    seriesData[listIndex].series.push(data);
                                }
                            }
                        }

                        cb();
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