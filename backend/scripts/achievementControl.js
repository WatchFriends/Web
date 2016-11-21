const achievementData = require("./../dataAccess/achievementFakeData.js");

let achievementControl = (function() {

    let achievements,
        getJson = function(cb) {

            cb(null, JSON.stringify(achievements));
        };

    achievements = achievementData.achievements;


    return {
        achievements: achievements,
        getJson: getJson
    };
})();

module.exports = achievementControl;