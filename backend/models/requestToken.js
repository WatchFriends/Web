/*jslint node: true */
"use strict";

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    utils = require("../helpers/utils");

var tokenSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    code: { type: String, unique: true, default: () => utils.uid(24) },
    redirectUri: String,
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    client: {
        type: Schema.ObjectId,
        ref: "AuthClient"
    }
});

tokenSchema.statics = {
    load: (id, cb) => this.findOne({_id: id}).exec(cb)
};

module.exports = mongoose.model("RequestToken", tokenSchema);