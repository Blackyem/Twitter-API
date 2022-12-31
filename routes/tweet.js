const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();

const Tweet = require("../models/tweet");
const User = require("../models/user");
const Comment = require("../models/comment");


router.get("/", async (req, res, next) => {
    const tweet = await Tweet.find();
    try {
        return res.status(200).json({
            count: tweet.length,
            message: "Tweets retrieved successfully!",
            tweet
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});
router.get("/comment", async (req, res, next) => {
    const comment = await Comment.find()
    try {
        return res.status(200).json({
            count: comment.length,
            message: "Comments retrieved successfully!",
            comment
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

router.post("/comment", async (req, res, next) => {
    const {
        message,
        content,
    } = req.body;
    const tweet = await Tweet.create({
        message,
    });
    const comment = await Comment.create({
        content,

    })
    try {
        return res.status(201).json({
            message: "Tweet and Comment created successfully!",
            tweet,
            comment
        });
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }

});
router.post("/comment", async (req, res, next) => {
    const {
        message,
        content,
    } = req.body;
    const tweet = await Tweet.create({
        message,
    });
    const comment = await Comment.create({
        content,
    })
    try {
        return res.status(201).json({
            message: "Tweet and Comment created successfully!",
            tweet,
            comment
        });
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }

});


router.get("/:tweetId/comment", async (req, res, next) => {
    const id = req.params.tweetId;
    const tweet = await Tweet.findOne({
        _id: req.params.tweetId
    })
    const comment = await Comment.find({

    })
    try {
        if (tweet) {
            return res.status(200).json({
                message: "A Tweet with all comments retrieved successfully!",
                tweet,
                count: comment.length,
                comment
            })
        } else {
            res.status(404).json({
                Message: "The provided ID is not valid..."
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});
router.get("/:tweetId", async (req, res, next) => {
    const id = req.params.tweetId;
    const tweet = await Tweet.findOne({
        _id: req.params.tweetId
    })
    try {
        if (tweet) {
            return res.status(200).json({
                message: "A Tweet retrieved successfully!",
                tweet
            })
        } else {
            res.status(404).json({
                Message: "The provided ID is not valid..."
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});


router.patch("/:tweetId", async (req, res, next) => {
    const id = req.params.tweetId;
    const updateOps = req.body;
    const tweet = await Tweet.updateOne({
        _id: id
    }, {
        $set: updateOps
    })
    try {
        return res.status(200).json({
            message: "A tweet was updated successfully!",
            tweet
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

router.delete("/:tweetId", async (req, res, next) => {
    const id = req.params.tweetId;
    const tweet = await Tweet.deleteOne({
        _id: id
    })
    try {
        return res.status(200).json({
            message: "A tweet was deleted successfully!!"
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

module.exports = router;