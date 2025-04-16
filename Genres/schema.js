import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
  },
  { collection: "genres" }
);
export default schema;
