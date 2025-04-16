import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import userModel from "../Users/model.js";
export function findAllReviews() {
  return model.find();
}
export function findReviewsForBook(bookId) {
  return model.find({ book_id: bookId });
}
export function createReview(review) {
  const newReview = { ...review, _id: uuidv4(), review_date: new Date() };
  return model.create(newReview);
}
export function deleteReview(reviewId) {
  return model.deleteOne({ _id: reviewId });
}
export function updateReview(reviewId, reviewUpdates) {
  return model.updateOne({ _id: reviewId }, reviewUpdates);
}
export function findReviewsForUser(userId) {
  return model.find({ user_id: userId });
}
export async function findWriterForReview(reviewId) {
  const review = await model.findById(reviewId);
  if (!review) return null;
  const writer = await userModel.findById(review.user_id);
  return writer;
}
