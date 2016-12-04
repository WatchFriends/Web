const Achievement = require("./../models/Achievement.js"),
      AchievementType = require("./../models/AchievementType.js"),
      config = require("./dbConfig.js"),
      MongoClient = require('mongodb').MongoClient;

let achievementFakeData = (() => {

    let getAchievements = cb => {

        MongoClient.connect(config.db.development, (err, db) => {
            if (err) {
                cb(err, null);
            }
            
            let found = (err, items) => cb(null, items),            
                gotCollection = (err, collection) => collection.find().toArray(found);

            db.collection("Achievements", gotCollection);
        });
    };

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;