const achievementData = require("./../dataAccess/achievementFakeData.js");

let achievementControl = (function() {

    let achievements;

    achievementData.getAchievements(function(err, data){

        achievements = data;
    });

    return {
        achievements: achievements
    };
})();

module.exports = achievementControl;