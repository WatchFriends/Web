/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    authTypes = ["facebook","google"];

var userSchema = new Schema({
	name: String,
    email: String,
    username : String,
    provider: String,
    hash: String,
    salt: String,
    facebook: {},
    google: {}
});

userSchema.virtual("password").set(password=>{
    this._password = password;
    this.salt = this.makeSalt();
    this.hash = this.encrypt(password);
}).get(() => this._password);

var isprovider = provider => authTypes.indexof(provider) !==-1;

userSchema.path("name").validate(name => isprovider(this.provider) || name.length, "name cannot be empty"); 
userSchema.path("email").validate(email => isprovider(this.provider) || email.length, "e-mail cannot be empty"); 
userSchema.path("username").validate(username => isprovider(this.provider) || username.length, "username cannot be empty"); 
userSchema.path("hash").validate(hash => isprovider(this.provider) || hash.length, "password cannot be empty"); 

userSchema.pre("save", next =>{
    if(!this.isNew) return next();
    if(!this.password || !this.password.length && ! isprovider(this.provider)) next(new Error("invalid password"));
    else next();
});

userSchema.methods = {
    authenticate: plaintext => this.encrypt(plaintext) === this.hash,
    makeSalt: () => Math.round((new Date().valueof() * Math.random())) + '',
    encrypt: password => {
        if(!password) return '';
       // return crypto.createHmac('sha1', this.salt).update(password).digest('hex'); //TODO
    }
};

module.exports = mongoose.model('users', userSchema);

