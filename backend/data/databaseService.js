const config = require("./dbConfig.js"),
      mongoose = require('mongoose'),
      achievement = require("./../models/achievement");
      
module.exports = {
    getAchievements: (cb) => achievement.find({}, cb)
};