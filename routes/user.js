const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const User = require("../models/user");
const Tweet = require("../models/tweet");

router.get("/", async (req, res, next) => {
    const user = await User.find();
    try {
        return res.status(200).json({
            count: user.length,
            message: "Users retrieved successfully!",
            user
        })

    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
});

router.post("/", async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        password,
    } = req.body
    const user = await User.create({
        firstname,
        lastname,
        email,
        phone,
        password
    });
    try {
        return res.status(201).json({
            message: "User created successfully!",
            user
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

router.get("/:userId/tweet", async (req, res, next) => {
    const id = req.params.userId
    const user = await User.findOne({
        _id: id
    });
    const tweet = await Tweet.find({

    })
    try {
        if (user) {
            return res.status(200).json({
                message: "A user with all his tweet retrieved successfully!!",
                user,
                count: tweet.length,
                tweet,
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
})

router.get("/:userId", async (req, res, next) => {
    const id = req.params.userId
    const user = await User.findOne({
        _id: id
    });
    try {
        if (user) {
            return res.status(200).json({
                message: "A user retrieved successfully!!",
                user,
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
})

router.patch("/:userId", async (req, res, next) => {
    const id = req.params.userId;
    const updateOps = req.body;
    const user = await User.updateOne({
        _id: id
    }, {
        $set: updateOps
    })
    try {
        return res.status(200).json({
            message: "User updated successfully",
            user
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


router.patch("/:id/follow", async (req, res, next) => {
    const id = req.params.id
    const userToFollow = req.params.userId
    const follower = await User.findByIdAndUpdate({
        _id: id
    }, {
        $push: {
            follower: userToFollow
        }
    }, {
        new: true
    })

    const following = await User.findByIdAndUpdate({
        _id: id
    }, {
        $push: {
            following: id
        }
    }, {
        new: true
    })
    try {
        return res.status(200).json({
            message: "A user is successfully followed.",
            follower,
            following
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

router.patch("/:id/unfollow", async (req, res, next) => {
    const id = req.params.id
    const userToFollow = req.params.id
    const follower = await User.findByIdAndUpdate({
        _id: id
    }, {
        $pull: {
            following: userToFollow
        }
    }, {
        new: true
    })

    const following = await User.findByIdAndUpdate({
        _id: userToFollow
    }, {
        $pull: {
            follower: id
        }
    }, {
        new: true
    })
    try {
        return res.status(200).json({
            message: "A user is successfully unfollowed.",
            follower,
            following
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})


router.get("/:id/follows", async (req, res, next) => {
    const id = req.params.id
    const user = await User.findOne({
        _id: id
    })
    const following = await User.find({

    })

    try {
        return res.status(200).json({
            message: "A user with all  followers",
            user,
            following

        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }

})
router.delete("/:userId", async (req, res, next) => {
    const id = req.params.userId
    const user = await User.deleteOne({
        _id: id
    })

    try {
        return res.status(200).json({
            message: "A User was deleted successfully!!"
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

module.exports = router;