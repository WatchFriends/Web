const achievement = require("./../models/achievement.js"),
      achievementType = require("./../models/achievementType.js");

let achievementFakeData = (function() {

    let getAchievements = function(cb){
        var achievements = new Array();

        for (var i = 5; i--;) {

            achievements.push(achievement.init("Watcher", "", "Watch %d series", achievementType.init("brass", 10)));
            achievements.push(achievement.init("Watcher", "", "Watch %d series", achievementType.init("silver", 100)));
            achievements.push(achievement.init("Watcher", "", "Watch %d series", achievementType.init("gold", 500)));
        }

        cb(null, achievements);
    }

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;