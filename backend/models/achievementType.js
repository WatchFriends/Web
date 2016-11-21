const COLORS = {
    "brass": "#D1A684",
    "silver": "#B4B8BC",
    "gold": "#FFCC01"
};

let actievementType = (function() {

    let name,
        color,
        condition;

    return {    
        name: name,
        color: color,
        condition: condition
    };
})();

actievementType.prototype = {
    init: function (name, condition) {

            if (COLORS[name]) {
                this.name = name;
                this.color = COLORS[name];
                this.condition = condition;
            }
            else {
                console.log(name + " is not valid");
            }
        }
};

module.exports = actievementType;
//module.exports = COLORS;