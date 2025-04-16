import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    followee_id: { type: String, ref: "UserModel" },
    follower_id: { type: String, ref: "UserModell" },
  },
  { collection: "follows" }
);
export default schema;
