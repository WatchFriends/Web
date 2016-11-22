const achievementData = require("./../dataAccess/achievementFakeData.js");

let achievementControl = (function() {

    let getAchievements = function(cb) {

        let achievements;

        achievementData.getAchievements(function(err, data){

            if (err) {
                throw err;
            }

            achievements = data;
        });

        cb(null, achievements);
    };

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementControl;