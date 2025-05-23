import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    bio: String,
    role: {
      type: String,
      enum: ["USER", "AUTHOR", "ADMIN"],
      default: "USER",
    },
  },
  { collection: "users" }
);
export default userSchema;