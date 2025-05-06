import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },   
    refresh_token: {//access token save nai krta hum
      type: String,//jab 2 day login pr session expired popup aye
      default:""
    }      
  },
  {
    timestamps: true,
  }
);
const Profile = mongoose.model("profile", profileSchema);
export default Profile;
