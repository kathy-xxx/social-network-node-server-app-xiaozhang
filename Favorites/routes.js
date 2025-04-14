import * as dao from "./dao.js";
export default function FavoriteRoutes(app) {
  app.get("/api/favorites", (req, res) => {
    const favorites = dao.findAllFavorites();
    res.send(favorites);
  });
}
