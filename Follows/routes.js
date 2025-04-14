import * as dao from "./dao.js";
export default function FollowRoutes(app) {
  app.get("/api/follows", (req, res) => {
    const follows = dao.findAllFollows();
    res.send(follows);
  });
}
