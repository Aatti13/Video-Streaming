import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true,
    },
    img:{
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
      unique: true
    }
  },
  {timestamps: true}
)

export default mongoose.model("User", UserSchema);