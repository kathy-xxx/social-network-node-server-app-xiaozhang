import * as dao from "./dao.js";
export default function BookRoutes(app) {
  app.get("/api/books", (req, res) => {
    const books = dao.findAllBooks();
    res.send(books);
  });
  app.post("/api/books", (req, res) => {
    const newBook = dao.createBook(req.body);
    console.log("Create new book:", req.body);
    res.json(newBook);
  });
  app.delete("/api/books/:bookId", (req, res) => {
    const { bookId } = req.params;
    const status = dao.deleteBook(bookId);
    console.log("Delete book:", bookId);
    res.send(status);
  });
}
