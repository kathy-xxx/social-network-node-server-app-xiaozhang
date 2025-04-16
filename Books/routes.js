import * as dao from "./dao.js";
import * as reviewDao from "../Reviews/dao.js";
import books from "../Database/books.js";
export default function BookRoutes(app) {
  app.get("/api/books", async (req, res) => {
    const books = await dao.findAllBooks();
    res.send(books);
  });
  app.post("/api/books", async (req, res) => {
    const newBook = await dao.createBook(req.body);
    console.log("Create new book:", newBook);
    res.json(newBook);
  });
  app.delete("/api/books/:bookId", async (req, res) => {
    const { bookId } = req.params;
    const status = await dao.deleteBook(bookId);
    console.log("Delete book:", bookId);
    res.send(status);
  });
  app.put("/api/books/:bookId", async (req, res) => {
    const { bookId } = req.params;
    const bookUpdates = req.body;
    const status = await dao.updateBook(bookId, bookUpdates);
    console.log("Update book:", req.body);
    res.send(status);
  });
  app.get("/api/books/:bookId/reviews", async (req, res) => {
    const { bookId } = req.params;
    const reviews = await reviewDao.findReviewsForBook(bookId);
    res.send(reviews);
  });
  app.get("/api/books/:bookId", async (req, res) => {
    const { bookId } = req.params;
    const book = await dao.findBookById(bookId);
    res.send(book);
  });
  app.get("/api/books/:bookId/author", async (req, res) => {
    const { bookId } = req.params;
    const author = await dao.findAuthorForBook(bookId);
    res.send(author);
  });
  app.get("/api/books/genres/:genreId", (req, res) => {
    const { genreId } = req.params;
    const books = dao.findBooksByGenre(genreId);
    res.send(books);
  });
  app.get("/api/books/favorites/users/:userId", (req, res) => {
    const { userId } = req.params;
    const books = dao.findFavoriteBooksForUser(userId);
    res.send(books);
  });
}
