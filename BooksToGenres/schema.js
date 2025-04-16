import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    book_id: { type: String, ref: "BookModel" },
    genre_id: { type: String, ref: "GenreModel" },
  },
  { collection: "bookstogenres" }
);
export default schema;
