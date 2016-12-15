/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var seriesSchema = new Schema({
    userId: String,
    seriesId: Number
});

seriesSchema.statics = {
    load: (cb) => {
        this.find({}).exec(cb);
    },
    insert: (data, cb) => {
        this.insert(data).exec(cb);
    }
};

module.exports = mongoose.model("series", seriesSchema);