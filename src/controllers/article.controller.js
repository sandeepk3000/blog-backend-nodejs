import { Article } from "../models/article.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js"

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
    const articleId = req?.params?.articleId
    if (!articleId) {
        throw new ApiError(404, "Article id is required")
    }
    const { title, uniqueId, keywords, status, category, content, author } = req.body
    if ([title, uniqueId, keywords, status, category, content, author].some((value) => value.trim() === "")) {
        throw new ApiError(404, "All fields is required")
    }
    console.log("update", Object.keys(req.files).length);

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
    let thumbnail = null
    if (Object.keys(req.files).length > 0) {

        const thumbnailLocalPath = req.files.thumbnail[0].path

        thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        const isDeleteOnCloudinary = await deleteOnCloudinary(isExitsArticle.thumbnail.split("/")[7].split(".")[0])

        if (!isDeleteOnCloudinary) {
            throw new ApiError(500, "Server error during delete thumbnail on cloudinary")
        }
        if (!thumbnail) {
            throw new ApiError(500, "Server error during uploading thumbnail on cloudinary")
        }
    }
    const updatedArticle = await Article.findByIdAndUpdate(isExitsArticle._id, {
        title: title,
        uniqueId: uniqueId,
        keywords: keywords,
        status: status,
        category: category,
        content: content,
        author: author,
        thumbnail: thumbnail ? thumbnail.url : isExitsArticle.thumbnail
    }, {
        new: true
    })
    if (!updatedArticle) {
        throw new ApiError(500, "Server error during updating article")
    }
    return res.status(200)
        .json(new ApiResponse(200, "Article is updated successfully", updatedArticle, true))
})
const deleteArticle = asyncHandler(async (req, res) => {
    const articleId = req?.params?.articleId;
    if (!articleId) {
        throw new ApiError(404, "Article id is required")
    }

    const isExitsArticle = await Article.findOne({
        $or: [
            {
                uniqueId: null
            },
            {
                _id: articleId
            }
        ]
    })
    if (!isExitsArticle) {
        throw new ApiError(404, "Article is not exits")
    }

    const deletedArticle =  await Article.deleteOne({_id:isExitsArticle._id})
    if(!deletedArticle){
        throw new ApiError(500,"Server error during deleteArticle")
    }

    res.status(200)
    .json(new ApiResponse(200,"Article is successfully deleted",{},true))

})
export {
    createArticle,
    updateArticle,
    deleteArticle
}