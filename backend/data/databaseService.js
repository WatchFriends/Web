const config = require("./config.json"),
      mongoose = require('mongoose'),
      achievement = require("./../models/achievement"),
      users = require("./../models/user");
      
module.exports = {
    /* ACHIEVEMENTS */
    getAchievements: (cb) => achievement.find({}).exec(cb),
    
    /* SERIES */
    updateFollowingSeries: (body, cb) => {
        users.update({
            "_id": body.userId,
            "series": {
                "$not": {
                    "$elemMatch": {
                        "seriesId": body.seriesId,
                        "following": body.following
                    }
                }
            }
        }, {
            "$addToSet": {
                "series": {
                    "seriesId": body.seriesId,
                    "following": body.following,
                    "seasons": []
                }
            }
        }).exec(cb);

        users.update({
            "_id": body.userId,
            "series.seriesId": body.seriesId
        }, {
            "$set": {
                "series.$.following": body.following
            }
        }).exec();
    }
};