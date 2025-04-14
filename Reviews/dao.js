import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findAllReviews() {
  return Database.reviews;
}
export function findReviewsForBook(bookId) {
  const { reviews } = Database;
  const filteredReviews = reviews.filter((review) => review.book_id === bookId);
  return filteredReviews;
}
export function createReview(review) {
  const newReview = { ...review, _id: uuidv4() };
  Database.reviews = [...Database.reviews, newReview];
  return newReview;
}
export function deleteReview(reviewId) {
  const { reviews } = Database;
  Database.reviews = reviews.filter((review) => review._id !== reviewId);
}
export function updateReview(reviewId, reviewUpdates) {
  const { reviews } = Database;
  const review = reviews.find((review) => review._id === reviewId);
  Object.assign(review, reviewUpdates);
  return review;
}
export function findReviewsForUser(userId) {
  const { reviews } = Database;
  const filteredReviews = reviews.filter((review) => review.user_id === userId);
  return filteredReviews;
}
