const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
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

module.exports = mongoose.model("Comment", commentSchema)