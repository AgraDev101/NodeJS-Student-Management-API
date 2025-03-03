import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        let password = "123%40123"
        let username = "username123"
        let connect = await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.zefg1.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("database connected")   
    } catch (error) {
        console.log(error)   
    }
}