import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const signup = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body

    if ([name, username, email, password].some((value) => value.trim() === "")) {
        throw new ApiError(404, "All fields is required")
    }

    const exitUser = await User.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if (exitUser) {
        throw new ApiError(409, "User is already signup")
    }

    const user = await User.create({
        username: username,
        name: name,
        email: email,
        password: password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    res.status(201).json(new ApiResponse(201, "User is signup successfully", createdUser, true))
})
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        if (!userId) {
            throw new ApiError(404, "UserId is required")
        }
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generatRefreshToken()
        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {

    }
}
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((value) => value.trim() === "")) {
        throw new ApiError(404, "All fiels is required")
    }

    const user = await User.findOne({ email: email })

    if (!user) {
        throw new ApiError(404, "Invalid user")
    }
    const isPasswordTrue = await user.isValidPassword(password)

    if (!isPasswordTrue) {
        throw new ApiError(401, "Invalid password")
    }
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, "User logged successfully", { user: loggedUser, refreshToken, accessToken }, true) // not git
        )
})
const logout = asyncHandler(async (req, res) => {
    await User.updateOne({ _id: req.user._id }, {
        $unset: {
            refreshToken: 1
        }
    })
    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponse(200, "User logout successfully", {}, true)
        )
})
const getUser = asyncHandler(async (req, res) => {
    const { email, id, username } = req?.query || null

    if (!(email || id || username)) {
        throw new ApiError(404, "Filter is required")
    }
    const user = await User.findOne({
        $or: [
            {
                email: email
            },
            {
                _id: id
            },
            {
                username: username
            }
        ]
    }).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(404, "User is not exits")
    }

    res.status(200)
        .json(new ApiResponse(200, "User is fetched successfully", user, true))
})
const changePassword = asyncHandler(async (req, res) => {
    const { password, newPasword } = req.body
    if ([password, newPassword].some((value) => value === "")) {
        throw new ApiError(404, "Password is required")
    }
    const exitsUser = await User.findById(req.user._id)
    if (!exitUser) {
        throw new ApiError(409, "Unathorized request")
    }
    const isPasswordTrue = await user.isValidPassword(password)
    if (!isPasswordTrue) {
        throw new ApiError(400, "Invalid password")
    }
    const updatedUser = await User.updateOne({ _id: exitsUser._id }, {
        $set: {
            password: newPasword
        }
    })
    if (!updatedUser) {
        throw new ApiError(500, "Server error during updating password")
    }
    return res.status(200)
        .json(new ApiResponse(200, "Password changed successfully", updatedUser, true))

})
export {
    signup,
    login,
    logout,
    getUser,
    changePassword
}
