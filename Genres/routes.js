import * as dao from "./dao.js";
export default function GenreRoutes(app) {
  app.get("/api/genres", async (req, res) => {
    const genres = await dao.findAllGenres();
    res.send(genres);
  });
}
