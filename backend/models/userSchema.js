import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide Name"],
    },
    companyName: {
      type: String,
      required: [true, "please provide company Name"],
      // unique: true,
    },
    companyLocation: {
      type: String,
      required: [true, "please provide company location"],
      // unique: true,
    },
    country: {
      type: String,
      // required: [true, "please provide country"],
      // unique: true,
    },
    phoneNumber: {
      type: Number,
      // required: [true, "please provide phone number"],
      // unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
    // avatar: [
    //   {
    //     secure_url: String,
    //     public_id: String,
    //   },
    // ],
    role: {
      type: String,
      default: "user",
      enum:['user','admin','editor']
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema); 
export default User;
