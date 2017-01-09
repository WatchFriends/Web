const apiService = require("./../data/apiService"),
      dbService = require("./../data/databaseService"),
      utils = require("./../helpers/utils"),
      express = require("express"),
      async = require("async"),
      router = express.Router();

router.get("/list(/:user)?", (req, res, next) => {
    getLists(req, res, next);
});


let getLists = (req, res, next) => {

    const POPULAR = "Popular",
          YOU = "Recommend for you"
          FRIENDS = "Recommend by friends",
          TODAY_ON_TV = "Today on TV";

    let ListsData = [{ name: POPULAR,     series: [], apiRequest: "tv/popular"      , page: 1, totalPages: 0 },
                     { name: YOU,         series: [], apiRequest: ""                , page: 1, totalPages: 1 },
                  // { name: FRIENDS,     series: [], apiRequest: ""                , page: 1, totalPages: 0 },
                     { name: TODAY_ON_TV, series: [], apiRequest: "tv/airing_today" , page: 1, totalPages: 0 }],

    user = req.params.user || req.user._id,

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

        if (listItem.apiRequest !== "") {
            let requested = (err, data) => {

                if (err) {
                    next(err);
                    cb();
                }
                else if (data === null) {
                    next(new Error("Our service is temporarily unavailable"));
                    cb();
                }
                else {

                    let getfollowed = (series, followedCB) => {

                        dbService.findFollowedSeries(req.user._id, series.id, (err, data) => {
                            series["following"] = data ? data.following : false;
                            series["rating"] = data? data.rating : -1;
                            followedCB();
                        });
                    };

                    async.each(data.results, getfollowed, (err) => {

                        listItem.series = data.results;
                        listItem.totalPages = data.total_pages;
                        cb();   
                    });
                }
            };
            apiService.request(listItem.apiRequest, requested);
        }
        else {
            
            let getsimilarseries = (series, similarCB) => {
                apiService.request(`tv/${series.id}/similar`, (err, data) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        listItem.series.push.assert(listItem.series, data.results);
                    }                    
                    similarCB();
                });
            };

            switch (listItem.name) {
                case YOU:
                    dbService.getFollowedSeries(user, (err, data) => {

                        if (data != null && data.length !== 0) {

                            async.each(data, getsimilarseries, (err) => {
                                if (err) next(err);
                                cb();
                            });
                        }
                        else {
                            cb();
                        }
                    });
                    break;

                default:
                    cb();
                    break;
            }
        }
    };

    async.each(ListsData, apiCallSeries, everythingDone);
};

module.exports = router;