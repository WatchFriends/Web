const config = require("./config.json"),
      mongoose = require('mongoose'),
      achievement = require("./../models/achievement"),
      series = require("./../models/series");
      
module.exports = {
    /* ACHIEVEMENTS */
    getAchievements: (cb) => achievement.find({}).exec(cb),
    
    /* SERIES */
    insertFollowingSeries: (body, cb) => {

        series.insert(body).exec(cb);
    }
};