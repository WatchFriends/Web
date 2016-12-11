/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var listSchema = new Schema({
    _id: Number,
    name: String,
    series: [ Number ]
});

listSchema.statics = {
    load: (cb) => {
        this.find({}).exec(cb);
    }
};

module.exports = mongoose.model("lists", listSchema);