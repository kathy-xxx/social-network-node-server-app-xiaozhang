import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    user_id: { type: String, ref: "UserModel" },
    book_id: { type: String, ref: "BookModel" },
  },
  { collection: "favoritebooks" }
);
export default schema;
