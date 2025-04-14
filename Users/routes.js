import * as dao from "./dao.js";
import * as favoriteDao from "../Favorites/dao.js";
import * as followDao from "../Follows/dao.js";
export default function UserRoutes(app) {
  const createUser = (req, res) => {};
  const deleteUser = (req, res) => {};
  const findAllUsers = (req, res) => {
    dao.findAllUsers();
  };
  const findUserById = (req, res) => {
    const userId = req.params.userId;
    const user = dao.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    console.log("Update user:", req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signup = (req, res) => {
    console.log("Signup request body:", req.body);
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      console.log("Signup failed: Username already in use:", req.body.username);
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    console.log("Signup successful. New user created:", currentUser);
    res.json(currentUser);
  };
  const signin = (req, res) => {
    console.log("Signin request body:", req.body);
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      console.log("Signin successful. Current user:", currentUser);
      res.json(currentUser);
    } else {
      console.log("Signin unsussessful.");
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    console.log("Signout successful!");
    res.sendStatus(200);
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const favorite = (req, res) => {
    const { bookId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newFavorite = favoriteDao.createFavorite(currentUser._id, bookId);
    console.log("Add favorite:", currentUser._id, bookId);
    res.json(newFavorite);
  };
  const unfavorite = (req, res) => {
    const { bookId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const status = favoriteDao.deleteFavorite(currentUser._id, bookId);
    console.log("Delete favorite:", currentUser._id, bookId);
    res.json(status);
  };
  const findFavorites = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const favorites = favoriteDao.findFavoritesByUser(currentUser._id);
    res.json(favorites);
  };
  const follow = (req, res) => {
    const { followeeId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newFollow = followDao.createFollow(currentUser._id, followeeId);
    console.log("Add follow:", currentUser._id, followeeId);
    res.json(newFollow);
  };
  const unfollow = (req, res) => {
    const { followeeId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const status = followDao.deleteFollow(currentUser._id, followeeId);
    console.log("Delete follow:", currentUser._id, followeeId);
    res.json(status);
  };
  const findFollowersForUser = (req, res) => {
    const { userId } = req.params;
    const followers = followDao.findFollowersForUser(userId);
    res.json(followers);
  };
  const findFolloweesForUser = (req, res) => {
    const { userId } = req.params;
    const followees = followDao.findFolloweesForUser(userId);
    res.json(followees);
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/favorite/:bookId", favorite);
  app.delete("/api/users/favorite/:bookId", unfavorite);
  app.get("/api/users/favorites", findFavorites);
  app.post("/api/users/follow/:followeeId", follow);
  app.delete("/api/users/follow/:followeeId", unfollow);
  app.get("/api/users/:userId/followers", findFollowersForUser);
  app.get("/api/users/:userId/followees", findFolloweesForUser);
}
