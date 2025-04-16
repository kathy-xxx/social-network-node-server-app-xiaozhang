import * as dao from "./dao.js";
export default function FavoriteRoutes(app) {
  app.get("/api/favorites", async (req, res) => {
    const favorites = await dao.findAllFavorites();
    res.send(favorites);
  });
}
