const Achievement = require("./../models/Achievement.js"),
      AchievementType = require("./../models/AchievementType.js"),
      config = require("./dbConfig.js"),
      mongoose = require("mongodb").MongoClient;

let achievementFakeData = (function() {

    let getAchievements = function(cb){

        const connectionString = config.db;

        let achievements = [],
            db = null,
            collection = function(err, data) {
                var query = db.find({}).select({});

                query.exec(function (err, someValue) {
                    if (err) {
                        return cb(err);
                    }
                    achievements = someValue;
                    cb(null, achievements)
                });
            },
            connected = function (err, db) {

                if (err) {
                    cb(err, null);
                }
                else {

                    db.collection("Achievements", {}, collection);
                    cb(null, achievements);
                }
            };
        
        db = mongoose.connection;
        mongoose.connect(connectionString.development, connected);

        cb(null, achievements);
    };

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;