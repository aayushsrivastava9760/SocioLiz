const express = require("express")
const router = express.Router()
const Comment = require("../models/Comment")

// new comment

router.post("/", async (req,res)=>{
    const newComment = new Comment(req.body)
    try {   
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get comments

router.get("/:postId", async (req,res)=>{
    try {
        const comments = await Comment.find({
            postId: req.params.postId
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router