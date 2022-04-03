const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

// update user

router.patch("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate({_id:req.params.id},{
                $set: req.body,
            },
            {new:true,runValidators:true}
            )
            // res.status(200).json("Account has been updated")
            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You can update only your account")
    }
})

// delete a user

router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.deleteOne({_id:req.params.id})
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You can delete only your account")
    }
})


// get a user

router.get("/", async (req,res) =>{
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId ? 
        await User.findOne({
            _id:userId
        })
        :
        await User.findOne({
            username:username
        })
        const {password, updatedAt, createdAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get friends

router.get("/friends/:userId", async (req,res)=>{
    try {
        const user = await User.findOne({
            _id:req.params.userId
        })
        const friends = await Promise.all(
            user.following.map(friendId =>{
                return User.findOne({
                    _id:friendId
                })
            })
        )

        let friendList = []
        friends.map(friend=>{
            const {_id,username,profilePicture} = friend
            friendList.push({_id,username,profilePicture})
        })

        res.status(200).json(friendList)

    } catch (error) {
        res.status(500).json(error)
    }
})

// follow a user

router.patch("/:id/follow", async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const followUser = await User.findOne({_id:req.params.id})
            // const currentUser = await User.findOne({_id:req.body.userId})
            if(!followUser.followers.includes(req.body.userId)){
                await User.findByIdAndUpdate(
                    {
                        _id:req.params.id
                    },
                    {
                        $push:{
                            followers:req.body.userId
                        }
                    }
                )
                await User.findByIdAndUpdate(
                    {
                        _id:req.body.userId
                    },
                    {
                        $push:{
                            following:req.params.id
                        }
                    }
                )
                res.status(200).json("you followed the user")
            }
            else{
                res.status(403).json("you already follow the user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You can't follow yourself")
    }
})

// unfollow a user

router.patch("/:id/unfollow", async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const unfollowUser = await User.findOne({_id:req.params.id})
            // const currentUser = await User.findOne({_id:req.body.userId})
            if(unfollowUser.followers.includes(req.body.userId)){
                await User.findByIdAndUpdate(
                    {
                        _id:req.params.id
                    },
                    {
                        $pull:{
                            followers:req.body.userId
                        }
                    }
                )
                await User.findByIdAndUpdate(
                    {
                        _id:req.body.userId
                    },
                    {
                        $pull:{
                            following:req.params.id
                        }
                    }
                )
                res.status(200).json("you unfollowed the user")
            }
            else{
                res.status(403).json("you don't follow the user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("You can't unfollow yourself")
    }
})

// get users with similar usernames

router.get('/search/:username', async (req,res)=>{
    try {
        const users = await User.find({
            username: {$regex: req.params.username}
        })

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router