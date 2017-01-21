const service = require('../data/databaseService'),
    error = require('../helpers/errors'),
    fs = require('fs'),
    async = require('async');

module.exports = (function () {

    const _status = [
        {
            name: 'Bronze',
            color: '#D1A684'
        }, {
            name: 'Silver',
            color: '#B4B8BC'
        }, {
            name: 'Gold',
            color: '#FFCC01'
        }];
    let _userId;
    let _collected = [];

    let getAchievements = cb => service.getAchievements(cb);
    let getAchievementsByName = (name, cb) => service.getAchievementsByName(name, cb);

    let _functions = [
        cb => wrapper("Follower", service.getFollowedSeries, cb),
        cb => wrapper("Watcher", service.getFollowers, cb),
        cb => wrapper("Friends", service.getFollows, cb)
    ];

    let checkAchievements = (userId, cb) => {
        _userId = userId;

        async.each(_functions, (f, cb) => f(cb), (err) => {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, _collected);
            }
        });
    };

    function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    function wrapper(name, f, cb) {
        getAchievementsByName(name, (err, achievement) => {
            f(_userId, (err, data) => {
                if (err) {
                    return cb(err);
                }

                let s = null;
                let next;
                let readFile = (err, file) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        Array.prototype.push.apply(_collected, [{
                            name: achievement.name,
                            description: achievement.description,
                            status: s,
                            progress: data.length,
                            next,
                            image: ab2str(file)
                        }]);

                        cb();
                    }
                };

                achievement = achievement[0]._doc;
                achievement.types.sort((a, b) => { return a - b; });

                if (data.length !== 0) {
                    for (let i = achievement.types.length; i--;) {
                        if (achievement.types[i] <= data.length) {
                            s = _status[i];
                            if (achievement.types.length !== i + 1) {
                                next["goal"] = achievement.types[i + 1];
                                next["type"] = _status[i + 1];
                            }
                        }
                    }
                }

                if (s !== null) {
                    fs.readFile(__dirname + `/../resources/achievements/${name}.svg`, readFile);
                }
                else {
                    cb();
                }
            });
        });
    }

    return {
        getAchievements,
        checkAchievements,
        getAchievementsByName
    };
})();