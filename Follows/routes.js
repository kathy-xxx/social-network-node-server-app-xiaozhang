import * as dao from "./dao.js";
export default function FollowRoutes(app) {
  app.get("/api/follows",  async (req, res) => {
    const follows = await dao.findAllFollows();
    res.send(follows);
  });
}
