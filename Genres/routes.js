import * as dao from "./dao.js";
export default function GenreRoutes(app) {
  app.get("/api/genres", (req, res) => {
    const genres = dao.findAllGenres();
    res.send(genres);
  });
}
