const mongoose = require("mongoose")

const tweetSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
}, {
    versionKey: false
})

module.exports = mongoose.model("Tweet", tweetSchema)