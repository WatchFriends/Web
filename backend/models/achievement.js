/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var achievementSchema = new Schema({
    _id: Number,
    name: String,
    description: String,
    types: [ Number ]
});

achievementSchema.statics = {
    load: (cb) => {
        this.find({}).exec(cb);
    }
};

achievementSchema.methods = {
    /**
     * @param {Number} type index of type.
     */
    toString: (type) => this.description.replace("%d", this.types[type]),
    /**
     * @param {Number} type index of type.
     */
    image: (type) => `images/${this.name}${type}`
};

module.exports = mongoose.model("achievements", achievementSchema);