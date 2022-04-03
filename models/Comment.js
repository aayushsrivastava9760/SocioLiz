const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
        postId:{
            type:String
        },
        commenterId:{
            type:String
        },
        text:{
            type:String
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("Comment",CommentSchema)