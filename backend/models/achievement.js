/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var achievementSchema = new Schema({
    name: String,
    description: String,
    types: [{
        type: String,
        condition: Number
    }],
    image: String
});

achievementSchema.statics = {
    load: (id, cb) => this.findOne({_id: id}).exec(cb)
};

module.exports = mongoose.model("Achievement", achievementSchema);