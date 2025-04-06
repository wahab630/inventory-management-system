import mongoose from "mongoose";
import "dotenv/config";
import * as cloudinary from 'cloudinary'

export const connectDb = async () => {
  try {
    // connection ma error bhi a sakta he// basic se error handling
    const res = await mongoose.connect(process.env.DB_URI); // build in fn jise mongodb ki port dete kyunka ye bi network app ha
    console.log("database is connected at port:", res.connection.port);
  } catch (error) {
    console.log("connection error", error);
    mongoose.disconnect()
    process.exit(1)
  }
};

export const cloudinaryConfig = () => {
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
};
