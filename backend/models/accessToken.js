const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let tokenSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    token: String,
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    device: {
        osname: String,
        browsername: String
    },
    blocked: {
        type: Boolean,
        default: false
    }
});

tokenSchema.statics = {
    load: (id, cb) => this.find({ _id: id }).exec(cb)
};

module.exports = mongoose.model("accessTokens", tokenSchema);