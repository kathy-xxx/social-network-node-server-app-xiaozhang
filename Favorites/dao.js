import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export function findAllFavorites() {
  return model.find();
}
export function findFavoritesByUser(userId) {
  return model.find({ user_id: userId });
}
export function createFavorite(userId, bookId) {
  const newFavorite = { _id: uuidv4(), user_id: userId, book_id: bookId };
  return model.create(newFavorite);
}
export function deleteFavorite(userId, bookId) {
  return model.deleteOne({ user_id: userId, book_id: bookId });
}
