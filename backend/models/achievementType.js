const COLORS = {
    "brass": "#D1A684",
    "silver": "#B4B8BC",
    "gold": "#FFCC01"
};

let ActievementType = function(name, condition) {

    this.name = name;
    this.color = COLORS[name];
    this.condition = condition;
};

module.exports = ActievementType;