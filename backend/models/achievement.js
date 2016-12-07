const achievementType = ("./actievementType.js");

let Achievement = function(name, description, types) {

    this.name = name;
    this.description = description; //hint: gebruik "%d" in de beschrijving voor de voorwaarde van de achievement weer te geven
    this.types = types;
};

Achievement.prototype = {
    toString: function () {
        return this.description.replace("%d", this.type.condition);
    }
};

module.exports = Achievement;