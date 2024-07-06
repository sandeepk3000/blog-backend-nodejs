import mongoose from "mongoose"
const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    replies: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
            },
            parentComment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

export const Comment = mongoose.model("Comment", commentSchema) 