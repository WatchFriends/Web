const config = require("./dbConfig.js"),
      MongoClient = require('mongodb').MongoClient;
      
module.exports = {
    getAchievements: (cb) => {
         MongoClient.connect(config.db.development, (err, db) => {
            if (err) cb(err);
            else{
                db.collection("achievements", (err, collection) => {
                    if (err) cb(err);            
                    else collection.find().toArray(cb);
                });
            }
        });
    }
};