import * as dao from "./dao.js";
export default function ReviewRoutes(app) {
  app.get("/api/reviews", async (req, res) => {
    const reviews = await dao.findAllReviews();
    res.send(reviews);
  });
  app.post("/api/reviews", async (req, res) => {
    const newReview = await dao.createReview(req.body);
    console.log("Create new review:", newReview);
    res.json(newReview);
  });
  app.delete("/api/reviews/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    const status = await dao.deleteReview(reviewId);
    console.log("Delete review:", reviewId);
    res.send(status);
  });
  app.put("/api/reviews/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    const reviewUpdates = req.body;
    const status = await dao.updateReview(reviewId, reviewUpdates);
    console.log("Update review:", req.body);
    res.send(status);
  });
  app.get("/api/reviews/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const reviews = await dao.findReviewsForUser(userId);
    res.send(reviews);
  });
  app.get("/api/reviews/:reviewId/writer", async (req, res) => {
    const { reviewId } = req.params;
    const writer = await dao.findWriterForReview(reviewId);
    res.send(writer);
  });
}
