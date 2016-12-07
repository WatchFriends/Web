const Achievement = require("./../models/Achievement.js"),
      AchievementType = require("./../models/AchievementType.js"),
      config = require("./config.js"),
      MongoClient = require('mongodb').MongoClient;

let achievementFakeData = (() => {

    let getAchievements = cb => {

        MongoClient.connect(config.db.development, (err, db) => {
            if (err) {
                cb(err, null);
            }
            
            let getCollection = (err, collection) => collection.find().toArray(cb);

            db.collection("Achievements", getCollection);
        });
    };

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;