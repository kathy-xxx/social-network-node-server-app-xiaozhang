import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import userModel from "../Users/model.js";
export function findAllBooks() {
  return model.find();
}
export function findBookById(bookId) {
  return model.findById(bookId);
}
export function createBook(book) {
  const newBook = { ...book, _id: uuidv4(), review_date: new Date() };
  return model.create(newBook);
}
export function deleteBook(bookId) {
  return model.deleteOne({ _id: bookId });
}
export function updateBook(bookId, bookUpdates) {
  return model.updateOne({ _id: bookId }, bookUpdates);
}
export async function findAuthorForBook(bookId) {
  const book = await model.findById(bookId);
  if (!book) return null;
  const author = await userModel.findById(book.author_id);
  return author;
}
export function findBooksByGenre(genreId) {
  const { books, bookstogenres } = Database;
  const mappings = bookstogenres.filter(
    (mapping) => mapping.genre_id === genreId
  );
  const validBookIds = mappings.map((mapping) => mapping.book_id);
  const filteredBooks = books.filter((book) => validBookIds.includes(book._id));
  return filteredBooks;
}
export function findFavoriteBooksForUser(userId) {
  const { favoritebooks, books } = Database;
  const userFavorites = favoritebooks.filter((fav) => fav.user_id === userId);
  const filteredBooks = books.filter((book) =>
    userFavorites.map((fav) => fav.book_id).includes(book._id)
  );
  return filteredBooks;
}
