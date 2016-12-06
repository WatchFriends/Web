const achievementType = ("./actievementType.js");

let Achievement = function(name, image, description, type) {

    this.name = name;
    this.image = image;
    this.description = description; //hint: gebruik "%d" in de beschrijving voor de voorwaarde van de achievement weer te geven
    this.type = type;
};

Achievement.prototype = {
    toString: function () {
        return this.description.replace("%d", this.type.condition);
    }
};

module.exports = Achievement;