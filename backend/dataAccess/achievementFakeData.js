const achievement = require("./../models/achievement.js"),
      achievementType = require("./../models/achievementType.js");

let achievementFakeData = (function() {

    let getAchievements = function(cb){
        var achievements = new Array();

        for (var i = 5; i--;) {

            achievements.push(achievement.prototype.init("Watcher", "", "Watch %d series", achievementType.prototype.init("brass", 10)));
            achievements.push(achievement.prototype.init("Follower", "", "Follow %d series", achievementType.prototype.init("silver", 100)));
            achievements.push(achievement.prototype.init("Voter", "", "Vote on %d series", achievementType.prototype.init("gold", 500)));
        }

        cb(null, achievements);
    }

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;