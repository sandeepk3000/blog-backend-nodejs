import mongoose from "mongoose"

const connectToDB = async()=>{
    try {
        const url = "mongodb://localhost:27017/blogs"
        const connectionInstance = await mongoose.connect(url)
        console.log("connectionInstance",connectionInstance)
    } catch (error) {
        console.log("error during connection ",error)
        process.exit(1)
    }

}
export default connectToDB