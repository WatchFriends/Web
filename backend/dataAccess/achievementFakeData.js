const Achievement = require("./../models/Achievement.js"),
      AchievementType = require("./../models/AchievementType.js");

let achievementFakeData = (function() {

    let getAchievements = function(cb){
        var achievements = new Array();

        for (var i = 5; i--;) {

            achievements.push(new Achievement("Watcher", "", "Watch %d series", new AchievementType("brass", 10)));            
            achievements.push(new Achievement("Follower", "", "Watch %d series", new AchievementType("silver", 100)));
            achievements.push(new Achievement("Voter", "", "Watch %d series", new AchievementType("gold", 500)));
        }

        cb(null, achievements);
    }

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementFakeData;