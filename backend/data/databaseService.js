const config = require("./config.json"),
      mongoose = require('mongoose'),
      achievement = require("./../models/achievement");
      
module.exports = {
    getAchievements: (cb) => achievement.find({}).exec(cb)
};