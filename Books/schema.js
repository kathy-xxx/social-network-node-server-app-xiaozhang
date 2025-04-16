import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    isbn: String,
    summary: String,
    publication_date: Date,
    cover_image_url: String,
    average_rating: String,
    reviews_locker: Boolean,
    author_id: { type: String, ref: "UserModel" },
  },
  { collection: "books" }
);
export default schema;
