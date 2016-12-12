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
                toLoad = 0,
                loaded = 0;

            for (let listIndex = data.length; listIndex--;) {

                let temp = { 
                    name: data[listIndex].name, 
                    series: [] 
                };

                for (let seriesIndex = data[listIndex].series.length; seriesIndex--;) {

                    let id = data[listIndex].series[seriesIndex];
                    toLoad += 1;

                    apiService.request(`tv/${id}?append_to_response=images,similar`, (err, data) => {
                        if (err) {
                            // next(err);
                        }
                        else {
                            loaded += 1;
                            temp.series.push(data);
                        }
                    });
                }

                seriesData.push(temp);
            }

            setTimeout(() => {
                res.send(seriesData);
            }, 5000);
        }
    });
});

module.exports = router;