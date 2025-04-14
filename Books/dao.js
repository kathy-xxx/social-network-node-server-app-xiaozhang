import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
export function findAllBooks() {
  return Database.books;
}
export function findBookById(bookId) {
  const book = Database.books.find((book) => book._id === bookId);
  return book;
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
export function updateBook(bookId, bookUpdates) {
  const { books } = Database;
  const book = books.find((book) => book._id === bookId);
  Object.assign(book, bookUpdates);
  return book;
}
export function findAuthorForBook(bookId) {
  const { users, books } = Database;
  const book = books.find((book) => book._id === bookId);
  const author = users.find((user) => user._id === book.author_id);
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
