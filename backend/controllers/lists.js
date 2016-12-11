const dbService = require("./../data/databaseService.js"),
      apiService = require("./../data/apiService.js"),
      express = require("express"),
      router = express.Router();

router.get("/list", (req, res, next) => {

    dbService.getLists((err, data) => {
        if (err) {
            next(err);
        }
        else {
            
            let seriesData = [];

            for (var listIndex = data.length; listIndex--;) {

                let temp = { 
                    name: data[listIndex].name, 
                    series: [] 
                };

                for (var seriesIndex = data[listIndex].series.length - 1; seriesIndex--;) {

                    let id = data[listIndex].series[seriesIndex];

                    apiService.request(`tv/${id}?append_to_response=images,similar`, (err, data) => {
                        if (err) {
                            next(err);
                        }
                        else {
                            temp.series.push(data);
                        }
                    });
                }

                seriesData.push(temp);
            }

            res.send(seriesData);
        }
    });
});

module.exports = router;