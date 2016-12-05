const achievementData = require("./../dataAccess/achievementData.js");

let achievementControl = (() => {

    let getAchievements = cb => {

        achievementData.getAchievements((err, data) => {

            if (err) {
                throw err;
            }

            cb(null, data);
        });
    };

    return {
        getAchievements: getAchievements
    };
})();

module.exports = achievementControl;