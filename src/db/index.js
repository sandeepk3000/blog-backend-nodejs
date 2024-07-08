import mongoose from "mongoose"
const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        // console.log("connectionInstance", connectionInstance)
    } catch (error) {
        console.log("error during connection ", error)
        process.exit(1)
    }

}
export default connectToDB