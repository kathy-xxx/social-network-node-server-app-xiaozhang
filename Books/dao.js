import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findAllBooks() {
  return Database.books;
}
export function createBook(book) {
  const newBook = { ...book, _id: uuidv4() };
  Database.books = [...Database.books, newBook];
  return newBook;
}
export function deleteBook(bookId) {
  const { books } = Database;
  Database.books = books.filter((book) => book._id !== bookId);
}
