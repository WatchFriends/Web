const achievementType = ("./actievementType.js");

let achievement = (function() {

    let name,
        image,
        description, //hint: gebruik "%d" in de beschrijving voor de voorwaarde van de achievement weer te geven.
        type,
        init = function (name, image, description, type) {
              this.name = name;
              this.image = image;
              this.description = description;
              this.type = type;

              return this;
          };

    return {
        name: name,
        image: image,
        description: description,
        type: type,
        init: init
    };
})();

achievement.prototype = {
    
    toString: function () {
                  return util.format(description, type.condition);
              }
};

module.exports = achievement;