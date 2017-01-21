const service = require('../data/databaseService.js');

module.exports = (function () {

    let getAchievements = cb => service.getAchievements(cb);
    let getAchievementsByName = (name, cb) => service.getAchievementsByName(name, cb);

    let checkAchievements = (userId, cb) => {
        let collected = [];
        let fuctions = [
            cb => { // Follower
                getAchievementsByName("Follower", (err, data) => {
                    if (err) {
                        cb(err, null);
                    }
                    else {

                    }
                });
            },
            cb => { // Watcher
                cb();
            },
            cb => { // Friends
                cb();
            }
        ];

        require('async').each(functions, (f, cb) => f(cb), (err) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, collected);
            }
        });
    };

    return {
        getAchievements,
        checkAchievements,
        getAchievementsByName
    };
})();