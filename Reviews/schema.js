import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    rating: String,
    title: String,
    content: String,
    review_date: Date,
    book_id: { type: String, ref: "BookModel" },
    user_id: { type: String, ref: "UserModel" },
  },
  { collection: "reviews" }
);
export default schema;
