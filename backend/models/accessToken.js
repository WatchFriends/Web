var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var tokenSchema = new Schema({
    tokens: [{
        token: { type: String, required: true, index: { unique: true }},
        device: { 
            ipaddress: { type: String },
            deviceversion: { type: String, required: true }
        },
        created: {
            type: Date,
            default: Date.now,
            required: true
        },
        blocked:  { type: String, required: true, default: false }
    }],
    user: {
        type: Schema.ObjectId,
        ref: "User"
    }
});

tokenSchema.statics = {
    load: (id, cb) => this.findOne({_id: id}).exec(cb)
};

module.exports = mongoose.model("AccessToken", tokenSchema);