import mongoose from "mongoose"
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    uniqueId: {
        type: String,
        required: true,
        index: true
    },
    keywords: [
        {
            type: String,
            lowercase: true,
            trim: true
        }
    ],
    status: {
        type: String,
        enum: ["active", "inactive"],
        lowercase: true,
        default: "active"
    },
    category: {
        type: String,
        enum: ["programming", "tech", "job", "science", "education", "spritual"],
        lowercase: true,
        required: true
    },
    thumbnail:{
        type:String,
        required:true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        index: true,
    },
    views: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})


export const Article = mongoose.model("Article", articleSchema)