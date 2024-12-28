import mongoose from "mongoose"

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connection: Success')
    } catch (error) {
        console.log('Error connecting to MongoDB')
    }

}

export default connectDB