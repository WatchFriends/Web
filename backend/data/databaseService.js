const config = require("./config.json"),
      mongoose = require('mongoose'),
      achievement = require("./../models/achievement"),
      list = require("./../models/list");
      
module.exports = {
    getAchievements: (cb) => achievement.find({}).exec(cb),
    getLists: (cb) => list.find({}).exec(cb)
};