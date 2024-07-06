import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
const verifyJWT = asyncHandler(async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401,"Unauthorization request")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(404,"User is not signup")
        }
        req.user = user
        return next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid AccessToken")
    }
})

export default verifyJWT;