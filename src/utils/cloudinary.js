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
        fs.unlinkSync(file)
        return response
    } catch (error) {
        fs.unlinkSync(file)
    }
}
const deleteOnCloudinary = async (fileId) => {
    console.log("fileId path cloudinary ", fileId);
    try {
        if (!fileId) return null
        const res = await cloudinary.uploader.destroy(fileId)
        return res.result === "ok" ? true : false
    } catch (error) {

    }
}
export { uploadOnCloudinary, deleteOnCloudinary }



