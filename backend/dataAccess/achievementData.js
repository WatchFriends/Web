const Achievement = require("./../models/Achievement.js"),
      AchievementType = require("./../models/AchievementType.js"),
      config = require("./dbConfig.js"),
      mongoose = require("mongoose");

let achievementFakeData = (function() {

    let getAchievements = function(cb){
        let achievements = [],
            connectionString = config.db.development,
            db = null;
        
        mongoose.connect(connectionString);
        db = mongoose.connection;

        let opened = function() {
            console.log("connected");
            
        },
        error = function(error) {
            console.error(error.message);
        };

        db.on('error', error);
        db.once('open', opened);

        cb(null, achievements);
    };

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;