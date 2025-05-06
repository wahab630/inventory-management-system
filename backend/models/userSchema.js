import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide Name"],
      trim: true
    },   
    email: {
      type: String,
      unique: true,
      trim: true,
      lower: true,
      required: [true, "please provide email"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "please provide password"],
    }    
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);
export default User;
