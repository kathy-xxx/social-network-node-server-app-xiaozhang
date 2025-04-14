import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findAllFavorites() {
    return Database.favoritebooks;
}
export function findFavoritesByUser(userId) {
    const favorites = Database.favoritebooks.filter((favorite) => favorite.user_id === userId);
    return favorites;
}
export function createFavorite(userId, bookId) {
  const newFavorite = { _id: uuidv4(), user_id: userId, book_id: bookId };
  Database.favoritebooks = [...Database.favoritebooks, newFavorite];
  return newFavorite;
}
export function deleteFavorite(userId, bookId) {
  const { favoritebooks } = Database;
  Database.favoritebooks = favoritebooks.filter(
    (favorite) => !(favorite.user_id === userId && favorite.book_id === bookId)
  );
}
