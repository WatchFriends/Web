const achievement = require("./../models/achievement.js"),
      achievementType = require("./../models/achievementType.js");

let achievementFakeData = (function() {

    var achievements = new Array();

    for (var i = 5; i--;) {

        let typeBrass = achievementType.prototype.init("brass", 10);

        achievements.push(achievement.prototype.init("Watcher", "", "Watch %d series", typeBrass));
        achievements.push(achievement.prototype.init("Watcher", "", "Watch %d series", achievementType.prototype.init("silver", 100)));
        achievements.push(achievement.prototype.init("Watcher", "", "Watch %d series", achievementType.prototype.init("gold", 500)));
    }

    return {
        achievements: achievements
    };

})();

module.exports = achievementFakeData;