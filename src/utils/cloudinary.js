import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploadOnCloudinary = async (file) => {
    console.log("file path cloudinary ", file);
    try {
        if (!file) return null
        const response = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })
        return response
    } catch (error) {

    }
}

export default uploadOnCloudinary



