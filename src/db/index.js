import mongoose from "mongoose"
<<<<<<< HEAD
const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL)
        // console.log("connectionInstance", connectionInstance)
    } catch (error) {
        console.log("error during connection ", error)
=======

const connectToDB = async()=>{
    try {
        const url = "mongodb+srv://geelucknow:ETlsFfb3xUPLBuNw@blogscluster.qmxsyx1.mongodb.net/skblogs?retryWrites=true&w=majority&appName=Blogscluster"
        const connectionInstance = await mongoose.connect(url)
        console.log("connectionInstance",connectionInstance)
    } catch (error) {
        console.log("error during connection ",error)
>>>>>>> origin/main
        process.exit(1)
    }

}
export default connectToDB