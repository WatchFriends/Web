const Achievement = require("./../models/Achievement.js"),
      AchievementType = require("./../models/AchievementType.js"),
      config = require("./dbConfig.js"),
      mongoose = require("mongodb").MongoClient;

let achievementFakeData = (function() {

    let getAchievements = function(cb){
        let achievements = [],
            connectionString = config.db.development,
            db = null,
            connected = function (err, db) {

                if (err) {
                    cb(err, null);
                }
                else {
                    console.log(db.message);
                }
            };
        
        mongoose.connect(connectionString, connected);
        db = mongoose.connection;

        cb(null, achievements);
    };

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;