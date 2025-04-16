import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import userModel from "../Users/model.js";
import booktogenreModel from "../BooksToGenres/model.js";
import favoriteModel from "../Favorites/model.js";
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
export async function findBooksByGenre(genreId) {
  const mappings = await booktogenreModel.find({ genre_id: genreId });
  const bookIds = mappings.map((m) => m.book_id);
  const books = await model.find({ _id: { $in: bookIds } });
  return books;
}
export async function findFavoriteBooksForUser(userId) {
  const userFavorites = await favoriteModel.find({user_id: userId});
  const bookIds = userFavorites.map(f => f.book_id);
  const books = await model.find({ _id: { $in: bookIds } });
  return books;
}
