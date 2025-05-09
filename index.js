import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session";
import cors from "cors";
import Hello from "./Hello.js";
import UserRoutes from "./Users/routes.js";
import BookRoutes from "./Books/routes.js";
import ReviewRoutes from "./Reviews/routes.js";
import FavoriteRoutes from "./Favorites/routes.js";
import GenreRoutes from "./Genres/routes.js";
import FollowRoutes from "./Follows/routes.js";
const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/hub";
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
Hello(app);
UserRoutes(app);
BookRoutes(app);
ReviewRoutes(app);
FavoriteRoutes(app);
GenreRoutes(app);
FollowRoutes(app);
app.listen(process.env.PORT || 4000);
