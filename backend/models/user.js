/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require("crypto"),
    authTypes = ["facebook", "google"];

var userSchema = new Schema({
    name: {
        familyName: { type: String, required: true },
        givenName: { type: String, required: true },
        middleName: { type: String, required: true }
    },
    email: { type: String, required: true },
    //local
    salt: String,
    hash: String,
    //oauth
    providers: [{name:String, id:String}] //provider name and user id
});

userSchema.virtual("password").set(password => {
    this._password = password;
    this.salt = this.makeSalt();
    this.hash = this.encrypt(password);
}).get(() => this._password);

var isprovider = providers => providers.foreach( provider => authTypes.indexof(provider) !== -1);

userSchema.pre("save", next => {
    if (!this.isNew) return next();
    if ((this.password && this.password.length ) || (this.providers && isprovider(this.providers))) next();
    else next(new Error("invalid password"));
});

userSchema.methods = {
    authenticate: plaintext => this.encrypt(plaintext) === this.hash,
    makeSalt: () => Math.round((new Date().valueof() * Math.random())) + '',
    encrypt: password => {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};

module.exports = mongoose.model('users', userSchema);

