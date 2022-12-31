const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    // tweets: [{
    //   type: mongoose.Type.Schema.ObjectId,
    //   ref: "Tweet"
    // }]
}, {
    versionKey: false
})

module.exports = mongoose.model("User", userSchema)