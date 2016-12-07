/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var achievementSchema = new Schema({
    name: String,
    description: String,
    types: [{
        //type: String,
        condition: Number
    }],
    //image: String
});

achievementSchema.statics = {
    load: (id, cb) => this.findOne({_id: id}).exec(cb)
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

module.exports = mongoose.model("Achievement", achievementSchema);