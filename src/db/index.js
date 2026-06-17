import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try{
        const mongodbURI = `${process.env.MONGODB_URI}/${DB_NAME}`;
        
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const connectionInstance = await mongoose.connect(mongodbURI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 10000,
            retryWrites: true,
            w: "majority"
        });

        console.log(`✅ MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
        return connectionInstance;
    }catch(error){
        console.error("❌ MongoDB connection error: ", error.message);
        console.error("Troubleshooting tips:");
        console.error("1. Verify MONGODB_URI is correctly set in .env");
        console.error("2. Check if your IP address is whitelisted in MongoDB Atlas:");
        console.error("   https://cloud.mongodb.com -> Network Access -> IP Whitelist");
        console.error("3. Ensure database credentials are correct");
        console.error("4. Check network connectivity to MongoDB Atlas");
        process.exit(1);
    }
}

export default connectDB;