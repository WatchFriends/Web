/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    utils = require("./../helpers/utils");

var authClientSchema = new Schema({
    created: {
        type: Date,
        default: Date.Now
    },
    name: String,
    key: String,
    secret: String
});

authClientSchema.static = {
    load: (id, cb) => this.findOne({_id: id}).exec(cb)
};

authClientSchema.pre("save", next => {
    if(!this.isNew) return next();
    this.key = utils.uid(16);
    this.secret = utils.uid(32);
    next();
});

module.exports = mongoose.model("AuthClient", authClientSchema);