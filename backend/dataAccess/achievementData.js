const Achievement = require("./../models/Achievement.js"),
      AchievementType = require("./../models/AchievementType.js"),
      config = require("./dbConfig.js"),
      mongoose = require("mongodb").MongoClient;

let achievementFakeData = (function() {

    let getAchievements = function(cb){

        const connectionString = config.db;

        let achievements = [],
            db = null,
            connected = function (err, db) {

                if (err) {
                    cb(err, null);
                }
                else {
                    cb(null, db);
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