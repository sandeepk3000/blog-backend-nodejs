import { Article } from "../models/article.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import { ApiError } from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const createArticle = asyncHandler(async (req, res) => {
    const { title, uniqueId, keywords, status, category, content, author } = req.body
    console.log(req.body);
    if ([title, uniqueId, keywords, status, category, content, author].some((value) => value.trim() === "")) {
        throw new ApiError(404, "All fields is required")
    }

    // const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    let thumbnailLocalPath;
    if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        thumbnailLocalPath = req.files.thumbnail[0].path
    }
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail local path is required")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!thumbnail) {
        throw new ApiError(500, "Server error during uploading thumbnail on cloudinary")
    }
    const createdArticle = await Article.create({
        title: title,
        uniqueId: uniqueId,
        keywords: keywords,
        status: status,
        category: category,
        content: content,
        author: author,
        thumbnail: thumbnail.url
    })
    if (!createdArticle) {
        throw new ApiError(505, "Server error during creating article")
    }

    res.status(200)
        .json(new ApiResponse(200, "Article created successfully", createdArticle))

})
const updateArticle = asyncHandler(async (req, res) => {
    const articleId  = req?.params?.articleId
    if (!articleId) {
        throw new ApiError(404, "Article id is required")
    }
    const { title, uniqueId, keywords, status, category, content, author } = req.body
    if ([title, uniqueId, keywords, status, category, content, author].some((value) => value.trim() === "")) {
        throw new ApiError(404, "All fields is required")
    }
    console.log("update", req.files.thumbnail[0].path);
    const isExitsArticle = await Article.findOne({
        $or: [
            {
                uniqueId: uniqueId
            },
            {
                _id: articleId
            }
        ]
    })
    if (!isExitsArticle) {
        throw new ApiError(404, "Article is not exits")
    }
    const updatedArticle = await Article.findByIdAndUpdate(isExitsArticle._id, {
        title: title,
        uniqueId: uniqueId,
        keywords: keywords,
        status: status,
        category: category,
        content: content,
        author: author,
    })
    if (!updatedArticle) {
        throw new ApiError(500, "Server error during updating article")
    }
    return res.status(200)
        .json(new ApiResponse(200, "Article is updated successfully", updatedArticle, true))
})
export {
    createArticle,
    updateArticle
}