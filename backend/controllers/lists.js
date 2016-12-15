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
            const popularListName = "Popular",
                  recommendByFriends = "Recommend by friends";

            seriesData.push({
                name: popularListName,
                series: []
            });

            // seriesData.push({
            //     name: recommendByFriends,
            //     series: []
            // });

            apiRequests.push({
                destinationListName: popularListName,
                path: `tv/popular`
            });

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
                        path: `tv/${id}`
                    });
                }
            }

            let apiCall = (apiReq, cb) => {
                apiService.request(apiReq.path, (err, data) => {
                    if (err) {
                        next(err);
                    }
                    else {

                        if (apiReq.destinationListName == popularListName) {

                            let picked = [];
                            for (var i = 5; i--;) {                            
                                let seriesIndex = Math.ceil(Math.random() * data.results.length - 1);

                                if (picked.indexOf(seriesIndex) >= 0) {
                                    i++;
                                }
                                else {
                                    picked.push(seriesIndex);

                                    for (let listIndex = seriesData.length; listIndex--;) {
                                        let name = seriesData[listIndex].name;

                                        if (name == apiReq.destinationListName) {
                                            seriesData[listIndex].series.push(data.results[seriesIndex]);
                                        }
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