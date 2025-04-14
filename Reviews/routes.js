import * as dao from "./dao.js";
export default function ReviewRoutes(app) {
  app.get("/api/reviews", (req, res) => {
    const reviews = dao.findAllReviews();
    res.send(reviews);
  });
  app.post("/api/reviews", (req, res) => {
    const newReview = dao.createReview(req.body);
    console.log("Create new review:", req.body);
    res.json(newReview);
  });
  app.delete("/api/reviews/:reviewId", (req, res) => {
    const { reviewId } = req.params;
    const status = dao.deleteReview(reviewId);
    console.log("Delete review:", reviewId);
    res.send(status);
  });
  app.put("/api/reviews/:reviewId", (req, res) => {
    const { reviewId } = req.params;
    const reviewUpdates = req.body;
    const status = dao.updateReview(reviewId, reviewUpdates);
    console.log("Update review:", req.body);
    res.send(status);
  });
  app.get("/api/reviews/users/:userId", (req, res) => {
    const { userId } = req.params;
    const reviews = dao.findReviewsForUser(userId);
    res.send(reviews);
  });
}
